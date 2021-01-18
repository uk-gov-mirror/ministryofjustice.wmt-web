const baseRow = {
  region_description: 'Region 1',
  region_id: 1,
  ldu_description: 'LDU 1',
  ldu_id: 1,
  team_description: 'Team 1',
  team_id: 1,
  offender_manager_forename: 'John',
  offender_manager_surname: 'Doe',
  workload_owner_id: 1
}

const baseTree = {
  N: { name: 'HMPPS', parent: undefined, children: ['R1'] },
  R1: { name: 'Region 1', parent: 'N', children: ['L1'] },
  L1: { name: 'LDU 1', parent: 'R1', children: ['T1'] },
  T1: { name: 'Team 1', parent: 'L1', children: ['I1'] },
  I1: { name: 'John Doe', parent: 'T1', children: [] }
}

module.exports.ROOT_REF = 'N'

module.exports.ROOT_NODE = {
  name: 'HMPPS',
  parent: undefined,
  children: []
}

module.exports.ORGANISATIONAL_HIERARCHY_DATA_SINGLE_BRANCH = [
  baseRow
]

module.exports.ORGANISATIONAL_HIERARCHY_TREE_SINGLE_BRANCH = baseTree

module.exports.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_INDIVIDUALS = [
  baseRow,
  Object.assign({}, baseRow, { offender_manager_forename: 'Jane', offender_manager_surname: 'Smith', workload_owner_id: 2 }),
  Object.assign({}, baseRow, { offender_manager_forename: 'Mike', offender_manager_surname: 'Smith', workload_owner_id: 3 }),
  Object.assign({}, baseRow, { offender_manager_forename: 'John', offender_manager_surname: 'Jones', workload_owner_id: 4 }),
  Object.assign({}, baseRow, { offender_manager_forename: 'James', offender_manager_surname: 'Jones', workload_owner_id: 5 })
]

module.exports.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_INDIVIDUALS = Object.assign({}, baseTree, {
  T1: { parent: 'L1', name: 'Team 1', children: ['I1', 'I2', 'I3', 'I4', 'I5'] },
  I2: { parent: 'T1', name: 'Jane Smith', children: [] },
  I3: { parent: 'T1', name: 'Mike Smith', children: [] },
  I4: { parent: 'T1', name: 'John Jones', children: [] },
  I5: { parent: 'T1', name: 'James Jones', children: [] }
})

module.exports.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_BRANCHES = [
  baseRow,
  Object.assign({}, baseRow, { offender_manager_forename: 'Jane', offender_manager_surname: 'Smith', workload_owner_id: 2 }),
  Object.assign({}, baseRow, { team_description: 'Team 2', team_id: 2, offender_manager_forename: 'Mike', offender_manager_surname: 'Jones', workload_owner_id: 3 }),
  Object.assign({}, baseRow, { ldu_description: 'LDU 2', ldu_id: 2, team_description: 'Team 3', team_id: 3, offender_manager_forename: 'John', offender_manager_surname: 'Jones', workload_owner_id: 4 }),
  Object.assign({}, baseRow, { region_description: 'Region 2', region_id: 2, ldu_description: 'LDU 3', ldu_id: 3, team_description: 'Team 4', team_id: 4, offender_manager_forename: 'James', offender_manager_surname: 'Jones', workload_owner_id: 5 }),
  Object.assign({}, baseRow, { region_description: 'Region 2', region_id: 2, ldu_description: 'LDU 3', ldu_id: 3, team_description: 'Team 4', team_id: 4, offender_manager_forename: 'Tim', offender_manager_surname: 'Jones', workload_owner_id: 6 })
]

module.exports.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES = {
  N: { parent: undefined, name: 'HMPPS', children: ['R1', 'R2'] },
  R1: { parent: 'N', name: 'Region 1', children: ['L1', 'L2'] },
  L1: { parent: 'R1', name: 'LDU 1', children: ['T1', 'T2'] },
  T1: { parent: 'L1', name: 'Team 1', children: ['I1', 'I2'] },
  I1: { parent: 'T1', name: 'John Doe', children: [] },
  I2: { parent: 'T1', name: 'Jane Smith', children: [] },
  T2: { parent: 'L1', name: 'Team 2', children: ['I3'] },
  I3: { parent: 'T2', name: 'Mike Jones', children: [] },
  L2: { parent: 'R1', name: 'LDU 2', children: ['T3'] },
  T3: { parent: 'L2', name: 'Team 3', children: ['I4'] },
  I4: { parent: 'T3', name: 'John Jones', children: [] },
  R2: { parent: 'N', name: 'Region 2', children: ['L3'] },
  L3: { parent: 'R2', name: 'LDU 3', children: ['T4'] },
  T4: { parent: 'L3', name: 'Team 4', children: ['I5', 'I6'] },
  I5: { parent: 'T4', name: 'James Jones', children: [] },
  I6: { parent: 'T4', name: 'Tim Jones', children: [] }
}

module.exports.ORGANISATIONAL_HIERARCHY_DATA_NULL_VALUES = [
  baseRow,
  Object.assign({}, baseRow, { region_id: 2, region_description: undefined, ldu_id: 2, ldu_description: undefined, team_id: 2, team_description: undefined, workload_owner_id: 2, offender_manager_forename: undefined, offender_manager_surname: undefined }),
  Object.assign({}, baseRow, { workload_owner_id: 3, offender_manager_forename: undefined, offender_manager_surname: 'Lee' }),
  Object.assign({}, baseRow, { workload_owner_id: 4, offender_manager_forename: 'Kim', offender_manager_surname: undefined })
]

module.exports.ORGANISATIONAL_HIERARCHY_TREE_NULL_VALUES = Object.assign({}, baseTree, {
  N: { name: 'HMPPS', parent: undefined, children: ['R1', 'R2'] },
  T1: { name: 'Team 1', parent: 'L1', children: ['I1', 'I3', 'I4'] },
  R2: { name: undefined, parent: 'N', children: ['L2'] },
  L2: { name: undefined, parent: 'R2', children: ['T2'] },
  T2: { name: undefined, parent: 'L2', children: ['I2'] },
  I2: { name: undefined, parent: 'T2', children: [] },
  I3: { name: 'Lee', parent: 'T1', children: [] },
  I4: { name: 'Kim', parent: 'T1', children: [] }
})
