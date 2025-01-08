class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.size >= this.capacity && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }
}

class QuadTree {
  constructor(bounds, capacity = 4) {
    this.bounds = bounds;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const { x, y, width, height } = this.bounds;
    const w2 = width / 2;
    const h2 = height / 2;

    this.nw = new QuadTree({ x, y, width: w2, height: h2 }, this.capacity);
    this.ne = new QuadTree({ x: x + w2, y, width: w2, height: h2 }, this.capacity);
    this.sw = new QuadTree({ x, y: y + h2, width: w2, height: h2 }, this.capacity);
    this.se = new QuadTree({ x: x + w2, y: y + h2, width: w2, height: h2 }, this.capacity);

    this.divided = true;
  }

  insert(point) {
    if (!this.bounds.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) this.subdivide();

    return this.nw.insert(point) ||
           this.ne.insert(point) ||
           this.sw.insert(point) ||
           this.se.insert(point);
  }

  query(range, found = []) {
    if (!range.intersects(this.bounds)) return found;

    for (const point of this.points) {
      if (range.contains(point)) found.push(point);
    }

    if (this.divided) {
      this.nw.query(range, found);
      this.ne.query(range, found);
      this.sw.query(range, found);
      this.se.query(range, found);
    }

    return found;
  }
}

class MarkerCache {
  constructor() {
    this.clusters = new LRUCache(1000);
    this.markers = new LRUCache(5000);
    this.quadtree = null;
  }

  initializeQuadTree(bounds) {
    this.quadtree = new QuadTree(bounds);
  }

  getCachedMarker(id) {
    return this.markers.get(id);
  }

  cacheMarker(id, marker) {
    this.markers.put(id, marker);
  }

  getCachedCluster(key) {
    return this.clusters.get(key);
  }

  cacheCluster(key, cluster) {
    this.clusters.put(key, cluster);
  }

  clear() {
    this.clusters.clear();
    this.markers.clear();
    this.quadtree = null;
  }
}

export const markerCache = new MarkerCache();