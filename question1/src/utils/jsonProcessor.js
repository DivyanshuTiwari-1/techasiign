const fs = require('fs');
const path = require('path');

//  Load and parse the TEST.json file

function loadJsonData() {
  const filePath = path.join(__dirname, '../../data/TEST.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

//  Query 1: Get average budget of all active campaigns from Marketing department

function getAverageBudgetActiveCampaigns() {
  const data = loadJsonData();
  
  // Find Marketing department
  const marketingDept = data.departments.find(dept => dept.name === 'Marketing');
  
  if (!marketingDept || !marketingDept.teams) {
    return 0;
  }
  
  // Collect all active campaigns from all teams in Marketing
  const activeCampaigns = [];
  marketingDept.teams.forEach(team => {
    if (team.campaigns) {
      team.campaigns.forEach(campaign => {
        if (campaign.active === true) {
          activeCampaigns.push(campaign);
        }
      });
    }
  });
  
  // Calculate average budget
  if (activeCampaigns.length === 0) {
    return 0;
  }
  
  const totalBudget = activeCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  return totalBudget / activeCampaigns.length;
}

//  Query 2: Get completed projects from Engineering department

function getCompletedProjectsEngineering() {
  const data = loadJsonData();
  
  // Find Engineering department
  const engineeringDept = data.departments.find(dept => dept.name === 'Engineering');
  
  if (!engineeringDept || !engineeringDept.teams) {
    return [];
  }
  
  // Collect all completed projects from all teams in Engineering
  const completedProjects = [];
  engineeringDept.teams.forEach(team => {
    if (team.projects) {
      team.projects.forEach(project => {
        if (project.completed === true) {
          completedProjects.push(project);
        }
      });
    }
  });
  
  return completedProjects;
}

//  Query 3: Get single manager who has more running projects or campaigns with high budget projects

function getManagerWithMostRunningProjects() {
  const data = loadJsonData();
  
  // Track manager stats: { name: { runningCount: number, totalBudget: number } }
  const managerStats = {};
  
  // Process all departments
  data.departments.forEach(dept => {
    if (dept.teams) {
      dept.teams.forEach(team => {
        const managerName = team.lead?.name;
        if (!managerName || !team.lead?.is_manager) {
          return;
        }
        
        // Initialize manager stats if not exists
        if (!managerStats[managerName]) {
          managerStats[managerName] = {
            runningCount: 0,
            totalBudget: 0
          };
        }
        
        // Process projects (Engineering)
        if (team.projects) {
          team.projects.forEach(project => {
            // Running project = not completed
            if (project.completed === false) {
              managerStats[managerName].runningCount++;
              managerStats[managerName].totalBudget += project.budget || 0;
            }
          });
        }
        
        // Process campaigns (Marketing)
        if (team.campaigns) {
          team.campaigns.forEach(campaign => {
            // Running campaign = active
            if (campaign.active === true) {
              managerStats[managerName].runningCount++;
              managerStats[managerName].totalBudget += campaign.budget || 0;
            }
          });
        }
      });
    }
  });
  
  // Find manager with most running projects/campaigns
  // If tie, prefer the one with higher total budget
  let topManager = null;
  let maxRunningCount = 0;
  let maxBudget = 0;
  
  Object.keys(managerStats).forEach(managerName => {
    const stats = managerStats[managerName];
    if (stats.runningCount > maxRunningCount || 
        (stats.runningCount === maxRunningCount && stats.totalBudget > maxBudget)) {
      topManager = managerName;
      maxRunningCount = stats.runningCount;
      maxBudget = stats.totalBudget;
    }
  });
  
  return topManager || '';
}

/**
 * Query 4: Return project names whose team members are same
 * Compares team_members arrays across all projects and finds duplicates
 * @returns {Array} Array of project names that share team members with other projects
 */
function getProjectsWithSameTeamMembers() {
  const data = loadJsonData();
  
  // Collect all projects with their team members
  const projectsWithTeams = [];
  
  data.departments.forEach(dept => {
    if (dept.teams) {
      dept.teams.forEach(team => {
        if (team.projects) {
          team.projects.forEach(project => {
            if (project.team_members && project.team_members.length > 0) {
              // Normalize team members array (sort and convert to lowercase for comparison)
              const normalizedMembers = [...project.team_members]
                .map(m => m.trim())
                .filter(m => m.length > 0)
                .sort();
              
              projectsWithTeams.push({
                name: project.name,
                teamMembers: normalizedMembers,
                originalMembers: project.team_members
              });
            }
          });
        }
      });
    }
  });
  
  // Find projects with matching team members
  const projectsWithSameTeams = new Set();
  
  for (let i = 0; i < projectsWithTeams.length; i++) {
    for (let j = i + 1; j < projectsWithTeams.length; j++) {
      const project1 = projectsWithTeams[i];
      const project2 = projectsWithTeams[j];
      
      // Compare normalized team members arrays
      if (project1.teamMembers.length === project2.teamMembers.length &&
          project1.teamMembers.every((member, idx) => member === project2.teamMembers[idx])) {
        projectsWithSameTeams.add(project1.name);
        projectsWithSameTeams.add(project2.name);
      }
    }
  }
  
  return Array.from(projectsWithSameTeams);
}

module.exports = {
  getAverageBudgetActiveCampaigns,
  getCompletedProjectsEngineering,
  getManagerWithMostRunningProjects,
  getProjectsWithSameTeamMembers
};

