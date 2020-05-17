import React from 'react';
import { Column, usePagination, useTable } from 'react-table';
import styled from 'styled-components';
import TableAtomic from '../../atomics/Table';
import TableHeadRow from '../../atomics/Table/TableHeadRow';
import TableBodyRow from '../../atomics/Table/TableBodyRow';
import NumberButton from '../../atomics/NumberButton';

const PageControlStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

interface TableProps {
    readonly columns: Column<object>[];
    readonly data: object[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data
        },
        usePagination
    );

    /* eslint-disable react/jsx-props-no-spreading */

    return (
        <>
            <TableAtomic {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </TableHeadRow>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <TableBodyRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </TableBodyRow>
                        );
                    })}
                </tbody>
            </TableAtomic>
            <PageControlStyle>
                <div>
                    <NumberButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        처음
                    </NumberButton>
                    <NumberButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                        이전
                    </NumberButton>
                    &nbsp;
                    <span>
                        <strong>{pageIndex + 1}</strong> / <strong>{pageOptions.length}</strong> 페이지
                    </span>
                    &nbsp; &nbsp;
                    <NumberButton onClick={() => nextPage()} disabled={!canNextPage}>
                        다음
                    </NumberButton>
                    <NumberButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        끝
                    </NumberButton>
                    <br />
                </div>
            </PageControlStyle>
            <PageControlStyle>
                <div>
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                        {[10, 20, 50, 100, 200].map((nowSize) => (
                            <option key={nowSize} value={nowSize}>
                                {nowSize} 개씩 보기
                            </option>
                        ))}
                    </select>
                </div>
            </PageControlStyle>
        </>
    );
};

export default Table;
