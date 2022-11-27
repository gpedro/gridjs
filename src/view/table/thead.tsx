import { h } from 'preact';
import { TR } from './tr';
import { TH } from './th';
import { classJoin, className } from '../../util/className';
import Header from '../../header';
import { TColumn } from '../../types';
import { calculateRowColSpans } from '../../util/table';
import { useConfig } from '../../hooks/useConfig';

export function THead(props: { header: Header }) {
  const config = useConfig();

  const renderColumn = (
    column: TColumn,
    rowIndex: number,
    columnIndex: number,
    totalRows: number,
  ) => {
    const { rowSpan, colSpan } = calculateRowColSpans(
      column,
      rowIndex,
      totalRows,
    );

    return (
      <TH
        column={column}
        index={columnIndex}
        colSpan={colSpan}
        rowSpan={rowSpan}
      />
    );
  };

  const renderRow = (row: TColumn[], rowIndex: number, totalRows: number) => {
    // because the only sortable columns are leaf columns (not parents)
    const leafColumns = Header.leafColumns(props.header.columns);

    return (
      <TR>
        {row.map((col) => {
          if (col.hidden) return null;

          return renderColumn(
            col,
            rowIndex,
            leafColumns.indexOf(col),
            totalRows,
          );
        })}
      </TR>
    );
  };

  const renderRows = () => {
    const rows = Header.tabularFormat(props.header.columns);

    return rows.map((row, rowIndex) => renderRow(row, rowIndex, rows.length));
  };

  if (props.header) {
    return (
      <thead
        key={props.header.id}
        className={classJoin(className('thead'), config.className.thead)}
      >
        {renderRows()}
      </thead>
    );
  }

  return null;
}
