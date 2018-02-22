
export let all_courses = [
  {
    index: '1',
    text: 'HTML'
  },
  {
    index: '2',
    text: 'CSS'
  },
  {
    index: '3',
    text: 'Bootstrap'
  },
  {
    index: '4',
    text: 'Javascript'
  },
  {
    index: '5',
    text: 'JQuery'
  },
  {
    index: '6',
    text: 'LESS'
  },
  {
    index: '7',
    text: 'SASS'
  }
];

export let assigned_courses = [];

export function removeItem(text, addItem, removeItem){
  let index;
  removeItem.map(data => {
    if(data.text === text) {
      addItem.push(data);
      index = removeItem.indexOf(data);
    }
  })

  removeItem.splice(index, 1);

  return {removeItem, addItem};
}

export function reorderedItems() {
  return {all_courses, assigned_courses};
}
