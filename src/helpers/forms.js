import { VInput, VToggle, VSelect } from '@/components/form'

export function toggleTemplate(label = '', name = '', value = false) {
  return {
    component: VToggle,
    label: label,
    name: name,
    value: value
  }
}

export function inputTemplate(type = '', label = '', name = '', value = '') {
  return {
    component: VInput,
    type: type,
    label: label,
    name: name,
    value: value
  }
}

export function loginForm () {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'email',
        label: 'Email',
        name: 'email',
        value: '',
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Password',
        name: 'password',
        value: '',
      }
    ]
  }
}

export function registerForm() {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'text',
        label: 'Name',
        name: 'name',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'email',
        label: 'Email',
        name: 'email',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Password',
        name: 'password',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Confirm Password',
        name: 'password_confirmation',
        value: ''
      }
    ]
  }
}

export function forgotPasswordForm() {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'email',
        label: 'Email',
        name: 'email',
        value: ''
      },
    ]
  }
}

export function updatePasswordForm() {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Current Password',
        name: 'current_password',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'New Password',
        name: 'password',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Confirm New Password',
        name: 'password_confirmation',
        value: ''
      }
    ]
  }
}

export function updateProfileForm() {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'text',
        label: 'Email Address',
        name: 'email',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'text',
        label: 'Name',
        name: 'name',
        value: ''
      },
    ]
  }
}


export function resetPasswordForm() {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'email',
        label: 'Email',
        name: 'email',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Password',
        name: 'password',
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'password',
        label: 'Confirm Password',
        name: 'password_confirmation',
        value: ''
      },
      {
        component: VInput,
        type: 'hidden',
        name: 'token',
        value: ''
      },
    ]
  }
}



export function monitorForm () {
  return {
    inputs: [
      {
        component: VInput,
        required: true,
        type: 'text',
        placeholder: 'Enter target URL',
        name: 'url',
        value: '',
      },
      {
        component: VInput,
        type: 'text',
        placeholder: 'Optional string to confirm in response',
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

export function channelForm () {
  return {
    inputs: [
      {
        component: VSelect,
        label: 'Select Integration Type',
        name: 'type',
        options: [
          { value: 'mail', label: 'E-Mail' },
          { value: 'slack', label: 'Slack Webhook' },
          { value: 'discord', label: 'Discord Webhook' },
          { value: 'PagerDuty', label: 'Pager Duty Events API v2' },
        ],
        value: ''
      },
      {
        component: VInput,
        required: true,
        type: 'text',
        label: 'Add your integrations endpoint (ex. email or webhook url)',
        name: 'endpoint',
        value: ''
      },
      {
        component: VInput,
        required: true,
        label: 'Give it a description',
        name: 'description',
        value: ''
      }
    ],
  }
}

