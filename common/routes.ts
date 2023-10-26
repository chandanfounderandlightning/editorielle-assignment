const teamDash = '/team/dashboard';

export const routes = {
    homePath: '/',
    team: {
      dashboard: {
        home: {
          default: `${teamDash}/home`,
          general: `${teamDash}/home/general`,
          notification: `${teamDash}/home/notifications`,
          plan: `${teamDash}/home/plan`,
          support: `${teamDash}/home/support`,
        },
        team: {
            default: `${teamDash}/team`,
            members: `${teamDash}/team/members`,
            categories: `${teamDash}/team/categories`,
        }
      },
    },
  } as const;