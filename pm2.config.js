module.exports = {
    apps : [{
      name: 'tomato',
      script: 'dist/main.js',
      instance_var: 'INSTANCE_ID',
      instances: 0,
      exec_mode: 'cluster',
      min_uptime: 5000,
      max_restarts: 5,
      args: '',
      env:{
        NODE_ENV:'development'
      }
    }],
  };
  