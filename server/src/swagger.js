module.exports = {
  swagger: '2.0',
  info: {
    version: '1',
    title: 'M-tracker App',
    description: 'Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request. To access privileged endpoints please provide the token generated at login'
  },
  host: 'm-tracker.herokuapp.com',
  basePath: '/api/v1/',
  tags: [
    {
      name: 'Requests',
      description: 'API for Requests in the system'
    }, {
      name: 'User',
      description: 'API for users in the system'
    }
  ],
  schemes: [
    'https', 'http'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['User'],
        summary: 'Creates an account for a new user',
        parameters:
          [
            {
              name: 'User',
              in: 'body',
              description: 'The details of the user',
              schema: {
                $ref: '#/definitions/user'
              }
            }
          ],
        responses: {
          201: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/user'
            }
          },
          400: {
            description: 'Error - Missing required fields'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['User'],
        summary: 'Logs a new user in',
        consumes: ['application/x-www-form-urlencoded'],
        parameters:
          [
            {
              name: 'email',
              in: 'formData',
              required: true,
              description: 'The email of the user',
              type: 'string'
            },
            {
              name: 'password',
              in: 'formData',
              required: true,
              description: 'The password of the user',
              type: 'string'
            }
          ],
        responses: {
          201: {
            description: 'User is logged in',
            schema: {
              $ref: '#/definitions/user'
            }
          },
          401: {
            description: 'Invalid Credentials'
          }
        }
      }
    },
    '/users/requests': {
      post: {
        tags: [
          'Requests'
        ],
        summary: 'Create new request for the logged in user',
        parameters: [
          {
            name: 'Request',
            in: 'body',
            description: 'The new request to be added',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          {
            name: 'x-access-token',
            in: 'header',
            description: 'The access token',
            type: 'string'
          }
        ],
        responses: {
          201: {
            description: 'New request is created',
            schema: {
              $ref: '#/definitions/requests'
            }
          },
          400: {
            description: 'Did not create request'
          },
          401: {
            description: 'Invalid login'
          }
        }
      },
      get: {
        tags: [
          'Requests'
        ],
        summary: 'Get all requests for the logged in user',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Filter requests by status',
            type: 'string'
          },
          {
            name: 'x-access-token',
            in: 'header',
            description: 'The access token',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Returns all the requests for the logged in user',
            schema: {
              $ref: '#/definitions/requests'
            }
          },
          401: {
            description: 'Invalid login'
          }
        }
      }
    },
    '/users/requests/{requestId}': {
      parameters: [
        {
          name: 'requestId',
          in: 'path',
          required: true,
          description: 'ID of the request to get',
          type: 'integer'
        },
        {
          name: 'x-access-token',
          in: 'header',
          description: 'The access token',
          type: 'string'
        }
      ],
      get: {
        tags: [
          'Requests'
        ],
        summary: 'Get request with given ID',
        responses: {
          200: {
            description: 'Returns the specified Request',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          404: {
            description: 'Could not find request'
          },
          401: {
            description: 'Invalid login'
          }
        }
      },
      put: {
        summary: 'Updates the request with the given ID',
        tags: [
          'Requests'
        ],
        parameters: [
          {
            name: 'Request',
            in: 'body',
            description: 'The new details of Request',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          {
            name: 'x-access-token',
            in: 'header',
            description: 'The access token',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Updated Request'
          },
          404: {
            description: ' Could not update Request'
          },
          401: {
            description: 'Invalid login'
          }
        }
      }
    },
    '/requests': {
      get: {
        tags: ['Requests'],
        summary: 'Get all requests in the application available only to the admin',
        parameters:
            [
              {
                name: 'x-access-token',
                in: 'header',
                description: 'The access token',
                type: 'string'
              }
            ],
        responses: {
          200: {
            description: 'All requests',
            schema: {
              $ref: '#/definitions/requests'
            }
          },
          401: {
            description: 'Invalid login'
          }
        }
      }
    },
    '/requests/{requestId}/approve': {
      put: {
        tags: ['Requests'],
        summary: 'sets status of a request as approved',
        parameters:
          [
            {
              name: 'requestId',
              in: 'path',
              required: true,
              description: 'ID of the request to get',
              type: 'integer'
            },
            {
              name: 'x-access-token',
              in: 'header',
              description: 'The access token',
              type: 'string'
            }
          ],
        responses: {
          200: {
            description: 'Approved request',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          401: {
            description: 'Invalid login'
          },
          403: {
            description: 'Available only to admin'
          }
        }
      }
    },
    '/requests/{requestId}/disapprove': {
      put: {
        tags: ['Requests'],
        summary: 'sets status of a request as disapproved',
        parameters:
          [
            {
              name: 'requestId',
              in: 'path',
              required: true,
              description: 'ID of the request to get',
              type: 'integer'
            },
            {
              name: 'x-access-token',
              in: 'header',
              description: 'The access token',
              type: 'string'
            }
          ],
        responses: {
          200: {
            description: 'Disapproved request',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          401: {
            description: 'Invalid login'
          },
          403: {
            description: 'Available only to admin'
          }
        }
      }
    },
    '/requests/{requestId}/resolve': {
      put: {
        tags: ['Requests'],
        summary: ' sets status of request as resolved',
        parameters:
          [
            {
              name: 'requestId',
              in: 'path',
              required: true,
              description: 'ID of the request to get',
              type: 'integer'
            },
            {
              name: 'x-access-token',
              in: 'header',
              description: 'The access token',
              type: 'string'
            }
          ],
        responses: {
          200: {
            description: 'Request status set as resolved',
            schema: {
              $ref: '#/definitions/request'
            }
          },
          401: {
            description: 'Invalid login'
          },
          403: {
            description: 'Available only to admin'
          }
        }
      }
    },
    '/admin/{userId}/approve': {
      put: {
        tags: ['User'],
        summary: 'Makes a user an admin',
        parameters:
          [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'ID of the user to make an admin',
              type: 'integer'
            },
            {
              name: 'x-access-token',
              in: 'header',
              description: 'The access token',
              type: 'string'
            }
          ],
        responses: {
          200: {
            description: 'User role is set to admin',
            schema: {
              $ref: '#/definitions/user'
            }
          },
          401: {
            description: 'Invalid login'
          },
          403: {
            description: 'Available only to admin'
          }
        }
      }
    },
  },
  definitions: {
    request: {
      required: [
        'title', 'description'
      ],
      properties: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        category: {
          type: 'string'
        },
        image: {
          type: 'string'
        }
      }
    },
    requests: {
      type: 'array',
      items: {
        $ref: '#/definitions/request'
      }
    },
    user: {
      required: [
        'email',
        'password',
        'firstName',
        'lastName'
      ],
      properties: {
        firstName: {
          type: 'string',
          uniqueItems: false
        },
        lastName: {
          type: 'string',
          uniqueItems: false
        },
        email: {
          type: 'string',
          uniqueItems: true
        },
        password: {
          type: 'string',
          uniqueItems: false
        }
      }
    }
  }
};
