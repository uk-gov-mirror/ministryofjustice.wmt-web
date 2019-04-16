
import argparse
import adi_config as config
from openpyxl import load_workbook

def main():
    """ Main application entrypoint """
    parser = argparse.ArgumentParser(
        description='Output dashboard'
    )

    parser.add_argument(
        'reductions',
        help='Dashboard reductions'
    )

    parser.add_argument(
        'capacity',
        help='Dashboard Capacity'
    )

    parser.add_argument(
        'caseload',
        help='Dashboard Caseload'
    )

    args = parser.parse_args()
    write_journal(args.reductions, args.caseload, args.capacity)

def write_dashboard(reductions, caseload, capacity):
    """ Update and save Dashboard file to disk """
    workbook = load_workbook(config.DASHBOARD_TEMPLATE_FILEPATH, keep_vba=True)
    update_dashboard_reductions(workbook, reductions)
    update_dashboard_caseload(workbook, caseload)
    update_dashboard_capacity(workbook, capacity)
    workbook.save(filename=filepath)

def update_dashboard_reductions(workbook, reductions):
    """ Update the dashboard reductions"""
    reductions_ws = workbook[config.DASHBOARD_REDUCTIONS_DATA_SHEET]

def update_dashboard_caseload(workbook, caseload):
    """ Update the dashboard caseload"""
    caseload_ws = workbook[config.DASHBOARD_CASELOAD_DATA_SHEET]

def update_dashboard_capacity(workbook, capacity):
    """ Update the dashboard capacity"""
    capacity_ws = workbook[config.DASHBOARD_CAPACITY_DATA_SHEET]

if __name__ == '__main__':
    main()
