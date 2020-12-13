export function  loginForm() {
  return {
    inputs: [
      {
        component: 'v-input',
        type: 'text',
        label: 'Email',
        name: 'email',
        value: 'test@example.com'
      },
      {
        component: 'v-input',
        type: 'password',
        label: 'Password',
        name: 'password',
        value: 'password'
      }
    ]
  }
}

export function monitorForm() {
  return {
    inputs: [
      {
        component: 'v-input',
        type: 'text',
        placeholder: 'Enter target URL',
        name: 'url',
        value: '',
      },
      {
        component: 'v-input',
        type: 'text',
        placeholder: 'Confirm string in result',
        name: 'look_for_string',
        value: ''
      },
      {
        component: 'v-toggle',
        label: 'Enable Uptime Check',
        name: 'uptime_check_enabled',
        classes: 'mt-5',
        value: true
      },
      {
        component: 'v-toggle',
        label: 'Enable Certificate Check',
        name: 'certificate_check_enabled',
        value: false
      }
    ],
  }
}
