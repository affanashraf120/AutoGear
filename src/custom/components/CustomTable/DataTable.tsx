import React, { forwardRef } from "react";
import MaterialTable, { Action, Column } from "material-table";
import {
    AddBox,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from "@material-ui/icons";

interface Icons {
    Add?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Check?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Clear?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Delete?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    DetailPanel?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Edit?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Export?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Filter?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    FirstPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    SortArrow?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    LastPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    NextPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    PreviousPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    ResetSearch?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    Search?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    ThirdStateCheck?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    ViewColumn?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

type Props = {
    columns: Column<any>[];
    data: any[];
    title: string;
    loading: boolean;
    actions?: Action<any>[];
    onRowDelete?: (data: any) => Promise<any>;
};

const DataTable = (props: Props) => {
    const { columns, data, title, loading, actions, onRowDelete } = props;
    return (
        <>
            <MaterialTable
                actions={actions}
                isLoading={loading}
                icons={tableIcons}
                columns={columns}
                data={data}
                title={title}
                editable={{
                    onRowDelete: onRowDelete,
                }}
                onChangePage={(value: any) => {
                    console.log(value);
                }}
            />
        </>
    );
};

export default DataTable;
