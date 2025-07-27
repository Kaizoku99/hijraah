import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming Shadcn table path

import { BaseArtifactData } from "../index";

interface SheetArtifactProps {
  artifact: BaseArtifactData;
}

interface SheetContent {
  columns: string[];
  rows: Record<string, any>[];
}

export const SheetArtifact: React.FC<SheetArtifactProps> = ({ artifact }) => {
  // Ensure content is in the expected format
  const content = (artifact.content || {
    columns: [],
    rows: [],
  }) as SheetContent;
  const columns = content.columns || [];
  const rows = content.rows || [];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{artifact.title || "Data Sheet"}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {columns.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={`header-${index}`}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      {/* Handle potential non-string values */}
                      {String(row[col] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {rows.length === 0 && artifact.status !== "streaming" && (
              <TableCaption>No data rows available.</TableCaption>
            )}
            {artifact.status === "streaming" && (
              <TableCaption>Streaming data...</TableCaption>
            )}
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground p-4">
            {artifact.status === "streaming"
              ? "Waiting for sheet data..."
              : "No sheet data available."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
