// Sample Data. Will be replaced with data coming from API.

export const fields = [
  { name: 'Name', type: 'text', placeholder: 'Enter Name' },
  { name: 'Age', type: 'number', placeholder: 'Enter age' },
  { name: 'Email', type: 'email', placeholder: 'Enter Email' },
  { name: 'Employed', type: 'checkbox' },
  {
    name: 'Favourite Colors',
    type: 'select',
    multiple: false,
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
    ],
  },
  { name: 'Gender', type: 'radio', value: 'Male' },
]