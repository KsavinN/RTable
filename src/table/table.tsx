import * as React from 'react';
import { useState, useEffect } from 'react';
import  styled  from 'styled-components';


export interface RtableProps {
    resumeColumn?: ResumeColumn;
    columns: RColumn[];
    data: any[];
}

interface RColumn {
    name: string,
    width?: number | string;
}

interface ResumeColumn extends RColumn {
    resumeFunc: Function;
}

interface StyledThemeRTable {
    inputColor?: string;
    width?: number | string;
    h?: boolean;
}


const CellHead = styled.th`
    max-width: ${( props: StyledThemeRTable ) => props?.width+'px'};
    background-color:wheat;
    cursor:pointer;
    border-bottom:1px solid;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
    position: sticky;
    top:0;
`;

const Cell = styled.td`
    border-bottom:1px solid;
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow:hidden;
    max-width: ${( props: StyledThemeRTable ) => props?.width+'px'};
`

const Table = styled.table`
    visibility: ${( props: StyledThemeRTable ) => props.h ? 'hidden':'visible'};
    font-size: 25px;
    border-collapse: collapse;
    overflow: auto;
`;

const ResumeCell = styled.td`
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow:hidden;
    position: sticky;
    right:0;
    border-bottom:1px solid;
    max-width: ${( props: StyledThemeRTable ) => props?.width+'px'};
    background-color:${(props : StyledThemeRTable) => props?.inputColor || 'lightyellow'};
`;

const ResumeHeader = styled.th`
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow:hidden;
    position: sticky;
    right:0;
    top:0;
    z-index:2;
    border-bottom:1px solid;
    max-width: ${( props: StyledThemeRTable ) => props?.width+'px'};
    background-color:${(props : StyledThemeRTable) => props?.inputColor || 'wheat'};
`

const Row = styled.tr``

export function RTable( props: RtableProps ) {
    const [ filterBy, setFilter ] = useState( null );
    const [ checked, set ] = useState( false );
    const { columns, data, resumeColumn } = props;

    useEffect( () => {
        console.log( checked );
        set( () => false );
    }, [ data, columns,checked ] );

    const sortBy = ( col: any ) => {
        set( true );
        setFilter( col.name.toLocaleLowerCase() );
    }; 
    return (
        <Table h={checked}>
            <RHeader onHeaderClick={sortBy} resumeColumn={resumeColumn}  columns={columns} />
            <RBody  filterBy={filterBy} columns={columns} resumeColumn={resumeColumn} data={data} />
        </Table>
    )
};

function RHeader( { columns, resumeColumn, onHeaderClick }: { columns: RtableProps[ 'columns' ] , resumeColumn?: ResumeColumn, onHeaderClick: Function } ) {
    return (
        <thead>
            <Row>
            {columns?.map( col => 
                <CellHead onClick={(e) => onHeaderClick(col)} width={col.width} key={col.name}>{col.name}</CellHead>
                )}
                {resumeColumn && <ResumeHeader width={resumeColumn?.width} >{resumeColumn.name}</ResumeHeader> }
            </Row>
        </thead>
    );
};





function RBody({data, resumeColumn, columns , filterBy }: { data: RtableProps['data'],  resumeColumn?: ResumeColumn, columns: RColumn[], filterBy:string | null}) {
    const sortedData = filterBy ? data.sort( ( a, b ) => {
        if(a[filterBy] < b[filterBy]) { return -1; }
        if(a[filterBy] > b[filterBy]) { return 1; }
        return 0;
    } ) : data;

    useEffect(() => {
       
    }  ,[data, filterBy])

    const findWidth = ( key: string ) => columns.find( ele => ele.name.toLocaleLowerCase() === key )?.width; 
    return (
        <tbody>
            {sortedData.map( (ele,index) => {
                const entries = Object.entries( ele );
                return <Row key={index}>
                    {entries.map( eleWithKey =>
                        <Cell
                            width={findWidth( eleWithKey[ 0 ] )}
                            key={`${ index }-${ eleWithKey }`}>{eleWithKey[ 1 ] as string}
                        </Cell> )}
                    {resumeColumn &&
                        <ResumeCell
                            width={resumeColumn?.width}>
                            {resumeColumn.resumeFunc( ele )}
                        </ResumeCell>}
                </Row>
            })}
        </tbody>
    );
};
