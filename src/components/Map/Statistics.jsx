import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ideologyColors } from '../../config/colors';
import { calculateIdeologyStats } from '../../utils/statistics';

const Statistics = ({ parties, selectedParty, onClose }) => {
  const ideologyStats = calculateIdeologyStats(parties);

  return (
    <div className="w-80 bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Statistiques</h2>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Distribution par idéologie</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={300} height={200}>
            <Pie
              data={ideologyStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {ideologyStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ideologyColors[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>

      {selectedParty && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedParty.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Pays:</strong> {selectedParty.country}</p>
            <p><strong>Idéologie:</strong> {selectedParty.ideology}</p>
            <p><strong>Fondé en:</strong> {selectedParty.yearFounded}</p>
            {selectedParty.yearDissolved && (
              <p><strong>Dissous en:</strong> {selectedParty.yearDissolved}</p>
            )}
            <p className="mt-2">{selectedParty.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Statistics;