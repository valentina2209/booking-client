const frontRoutes = {
    PAGES: {
        HOME: '/',
        BUSINESSES: {
            ROOT: '/businesses',
            ADD: 'new',
            EDIT: ':id/edit',
            DETAIL: ':id',
        },
        CLIENTS: {
            ROOT: '/clients',
            DETAIL: ':id',
        },
        MY_BOOKINGS: '/my-bookings',
        USERS: {
            ROOT: '/users',
        }
    },

    NAVIGATE: {
        HOME: '/',
        BUSINESSES: {
            ROOT: '/businesses',
            ADD: '/businesses/new',
            EDIT: (id) => `/businesses/${id}/edit`,
            DETAIL: (id) => `/businesses/${id}`,
        },
        CLIENTS: {
            ROOT: '/clients',
            DETAIL: (id) => `/clients/${id}`,
        },
        MY_BOOKINGS: '/my-bookings',
        USERS: {
            ROOT: '/users',
        }
    },
};

export default frontRoutes; 