import { performanceMonitor } from '../../utils/performanceMonitor';

class MapPerformanceTests {
  constructor(map, markerManager, loader) {
    this.map = map;
    this.markerManager = markerManager;
    this.loader = loader;
    this.monitor = performanceMonitor;
  }

  async runAllTests() {
    console.log('Starting performance tests...');
    
    const results = {
      loadTest: await this.testInitialLoad(),
      navigationTest: await this.testNavigation(),
      clusteringTest: await this.testClustering(),
      memoryTest: await this.testMemoryUsage()
    };

    console.log('Performance test results:', results);
    return results;
  }

  async testInitialLoad() {
    this.monitor.startMeasurement('initialLoad');
    
    // Test avec différentes tailles de données
    const sizes = [100, 1000, 5000];
    const loadResults = {};

    for (const size of sizes) {
      this.monitor.startMeasurement(`load${size}`);
      await this.loadTestMarkers(size);
      loadResults[`markers${size}`] = this.monitor.endMeasurement(`load${size}`);
    }

    const totalTime = this.monitor.endMeasurement('initialLoad');
    
    return {
      totalTime,
      loadResults,
      averageLoadTime: Object.values(loadResults).reduce((a, b) => a + b, 0) / sizes.length
    };
  }

  async testNavigation() {
    const testLocations = [
      { name: 'Paris', center: [48.8566, 2.3522], zoom: 5 },
      { name: 'New York', center: [40.7128, -74.0060], zoom: 6 },
      { name: 'Tokyo', center: [35.6762, 139.6503], zoom: 4 },
      { name: 'Global', center: [20, 0], zoom: 2 }
    ];

    const navigationResults = [];

    for (const location of testLocations) {
      this.monitor.startMeasurement(`navigation_${location.name}`);
      
      await this.map.setView(location.center, location.zoom);
      this.monitor.measureFrameRate();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigationResults.push({
        location: location.name,
        time: this.monitor.endMeasurement(`navigation_${location.name}`),
        fps: this.monitor.getAverageMetric('frameRate')
      });
    }

    return navigationResults;
  }

  async testClustering() {
    this.monitor.startMeasurement('clustering');
    
    const clusterResults = [];
    const zoomLevels = [2, 4, 6, 8, 10];

    for (const zoom of zoomLevels) {
      this.monitor.startMeasurement(`cluster_zoom_${zoom}`);
      
      await this.map.setZoom(zoom);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clusterResults.push({
        zoomLevel: zoom,
        time: this.monitor.endMeasurement(`cluster_zoom_${zoom}`),
        clusterCount: this.markerManager.getVisibleClusters().length
      });
    }

    const totalTime = this.monitor.endMeasurement('clustering');
    
    return {
      totalTime,
      clusterResults,
      averageClusterTime: clusterResults.reduce((acc, res) => acc + res.time, 0) / clusterResults.length
    };
  }

  async testMemoryUsage() {
    const memorySnapshots = [];
    const iterations = 5;

    for (let i = 0; i < iterations; i++) {
      this.monitor.startMeasurement(`memory_${i}`);
      
      // Créer et supprimer des marqueurs pour tester les fuites de mémoire
      await this.loadTestMarkers(1000);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.markerManager.cleanup();
      
      memorySnapshots.push({
        iteration: i,
        time: this.monitor.endMeasurement(`memory_${i}`),
        memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : 'Not available'
      });
    }

    return memorySnapshots;
  }

  async loadTestMarkers(count) {
    const markers = Array.from({ length: count }, (_, i) => ({
      id: i,
      coordinates: [
        Math.random() * 180 - 90,
        Math.random() * 360 - 180
      ],
      name: `Test Marker ${i}`,
      ideology: ['liberal', 'conservative', 'socialist'][Math.floor(Math.random() * 3)]
    }));

    await this.loader.addToQueue(markers);
    return markers;
  }
}

export const createPerformanceTests = (map, markerManager, loader) => 
  new MapPerformanceTests(map, markerManager, loader);
