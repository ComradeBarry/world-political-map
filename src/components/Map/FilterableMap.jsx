import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Couleurs par idéologie
const ideologyColors = {
  liberal: '#3498db',
  communist: '#e74c3c',
  green: '#2ecc71',
  conservative: '#34495e',
  socialist: '#e67e22',
  nationalist: '#9b59b6',
  centrist: '#7f8c8d'
};

// Contenu du composant comme avant, mais avec les chemins d'importation corrigés