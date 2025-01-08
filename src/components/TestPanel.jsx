import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TestPanel = ({ onRunTests }) => {
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    const results = await onRunTests();
    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <Card className="mt-4 p-4">
      <CardHeader>
        <CardTitle>Tests de Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className={`px-4 py-2 rounded-md ${
            isRunning ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isRunning ? 'Tests en cours...' : 'Lancer les tests'}
        </button>

        {testResults && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Résultats :</h3>
            
            <div className="mt-2 space-y-4">
              {/* Chargement initial */}
              <div>
                <h4 className="font-medium">Chargement Initial</h4>
                <p>Temps total : {testResults.loadTest.totalTime.toFixed(2)} ms</p>
                <ul className="ml-4">
                  {Object.entries(testResults.loadTest.loadResults).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value.toFixed(2)} ms
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="font-medium">Tests de Navigation</h4>
                <ul className="ml-4">
                  {testResults.navigationTest.map((result, index) => (
                    <li key={index}>
                      {result.location}: {result.time.toFixed(2)} ms (FPS: {result.fps.toFixed(1)})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clustering */}
              <div>
                <h4 className="font-medium">Performance du Clustering</h4>
                <p>Temps moyen : {testResults.clusteringTest.averageClusterTime.toFixed(2)} ms</p>
                <ul className="ml-4">
                  {testResults.clusteringTest.clusterResults.map((result, index) => (
                    <li key={index}>
                      Zoom {result.zoomLevel}: {result.time.toFixed(2)} ms 
                      ({result.clusterCount} clusters)
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mémoire */}
              <div>
                <h4 className="font-medium">Utilisation Mémoire</h4>
                <ul className="ml-4">
                  {testResults.memoryTest.map((snapshot, index) => (
                    <li key={index}>
                      Itération {snapshot.iteration + 1}: 
                      {typeof snapshot.memoryUsage === 'number' 
                        ? `${(snapshot.memoryUsage / 1024 / 1024).toFixed(2)} MB` 
                        : snapshot.memoryUsage}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestPanel;