class PerformanceMonitor {
  constructor() {
    this.metrics = {
      markerCreationTime: [],
      clusteringTime: [],
      renderTime: [],
      memoryUsage: [],
      frameRate: []
    };
    this.startTime = null;
    this.lastFrameTime = null;
    this.frameCount = 0;
  }

  startMeasurement(label) {
    if (!this.metrics[label]) {
      this.metrics[label] = [];
    }
    this.startTime = performance.now();
  }

  endMeasurement(label) {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.metrics[label].push(duration);
    return duration;
  }

  measureFrameRate() {
    const currentTime = performance.now();
    if (this.lastFrameTime) {
      const frameDuration = currentTime - this.lastFrameTime;
      const fps = 1000 / frameDuration;
      this.metrics.frameRate.push(fps);
    }
    this.lastFrameTime = currentTime;
    this.frameCount++;
  }

  getAverageMetric(label) {
    if (!this.metrics[label] || this.metrics[label].length === 0) {
      return 0;
    }
    const sum = this.metrics[label].reduce((a, b) => a + b, 0);
    return sum / this.metrics[label].length;
  }

  getMetricsSummary() {
    const summary = {};
    for (const [label, values] of Object.entries(this.metrics)) {
      if (values.length > 0) {
        summary[label] = {
          average: this.getAverageMetric(label),
          min: Math.min(...values),
          max: Math.max(...values),
          samples: values.length
        };
      }
    }
    return summary;
  }

  clear() {
    for (const key in this.metrics) {
      this.metrics[key] = [];
    }
    this.startTime = null;
    this.lastFrameTime = null;
    this.frameCount = 0;
  }
}

export const performanceMonitor = new PerformanceMonitor();