
import argparse
import dashboard_config as config
from openpyxl import load_workbook
import json

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
        help='Dashboard capacity'
    )

    parser.add_argument(
        'caseload',
        help='Dashboard caseload'
    )

    args = parser.parse_args()
    results = write_dashboard(args.reductions, args.capacity, args.caseload)
    return workbook

def write_dashboard(reductions, capacity, caseload):
    """ Update and return Dashboard """
    workbook = load_workbook(config.DASHBOARD_TEMPLATE_FILEPATH, keep_vba=True)
    update_dashboard_reductions(workbook, reductions)
    update_dashboard_capacity(workbook, capacity)
    update_dashboard_caseload(workbook, caseload)
    return workbook

def update_dashboard_reductions(workbook, reductions):
    """ Update the dashboard reductions"""
    reductions_ws = workbook[config.DASHBOARD_REDUCTIONS_DATA_SHEET]
    for reduction in reductions:
        print reduction

def update_dashboard_caseload(workbook, caseload):
    """ Update the dashboard caseload"""
    caseload_ws = workbook[config.DASHBOARD_CASELOAD_DATA_SHEET]
    for case in caseload:
        print case

def update_dashboard_capacity(workbook, capacity):
    """ Update the dashboard capacity"""
    capacity_ws = workbook[config.DASHBOARD_CAPACITY_DATA_SHEET]
    for cap in capacity:
        print cap

if __name__ == '__main__':
    main()
