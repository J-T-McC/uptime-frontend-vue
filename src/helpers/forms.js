import { VInput, VToggle, VSelect } from '@/components/form'

export function  loginForm() {
  return {
    inputs: [
      {
        component: VInput,
        type: 'text',
        label: 'Email',
        name: 'email',
        value: 'test@example.com'
      },
      {
        component: VInput,
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
        component: VInput,
        type: 'text',
        placeholder: 'Enter target URL',
        name: 'url',
        value: '',
      },
      {
        component: VInput,
        type: 'text',
        placeholder: 'Confirm string in result',
        name: 'look_for_string',
        value: ''
      },
      {
        component: VToggle,
        label: 'Enable Uptime Check',
        name: 'uptime_check_enabled',
        classes: 'mt-5',
        value: true
      },
      {
        component: VToggle,
        label: 'Enable Certificate Check',
        name: 'certificate_check_enabled',
        value: false
      }
    ],
  }
}

export function channelForm() {
  return {
    inputs: [
      {
        component: VSelect,
        label: 'Select Integration Type',
        name: 'type',
        options: [
          {value: 'mail', label: 'E-Mail'},
          {value: 'slack', label: 'Slack Webhook'},
          {value: 'discord', label: 'Discord Webhook'},
        ],
        value: 'test'
      },
      {
        component: VInput,
        type: 'text',
        label: 'Add your integrations endpoint (ex. email or webhook url)',
        name: 'endpoint',
        value: ''
      },
      {
        component: VInput,
        label: 'Give it a description',
        name: 'description',
        value: ''
      }
    ],
  }
}
