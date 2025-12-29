const express = require('express');
const router = express.Router();
const {
  getAverageBudgetActiveCampaigns,
  getCompletedProjectsEngineering,
  getManagerWithMostRunningProjects,
  getProjectsWithSameTeamMembers
} = require('../utils/jsonProcessor');

/**
 * GET /api/average-budget
 * Returns the average budget of all active campaigns from Marketing department
 */
router.get('/average-budget', (req, res) => {
  try {
    const averageBudget = getAverageBudgetActiveCampaigns();
    res.json({
      success: true,
      averageBudget: averageBudget,
      message: 'Average budget calculated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/completed-projects
 * Returns all completed projects from Engineering department
 */
router.get('/completed-projects', (req, res) => {
  try {
    const completedProjects = getCompletedProjectsEngineering();
    res.json({
      success: true,
      projects: completedProjects,
      count: completedProjects.length,
      message: 'Completed projects retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/top-manager
 * Returns the manager who has the most running projects or campaigns
 */
router.get('/top-manager', (req, res) => {
  try {
    const managerName = getManagerWithMostRunningProjects();
    res.json({
      success: true,
      manager: managerName,
      message: 'Top manager retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/same-team-projects
 * Returns project names that have the same team members
 */
router.get('/same-team-projects', (req, res) => {
  try {
    const projectNames = getProjectsWithSameTeamMembers();
    res.json({
      success: true,
      projects: projectNames,
      count: projectNames.length,
      message: 'Projects with same team members retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

