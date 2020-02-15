const calc = document.querySelector('.calc')
const keys = calc.querySelector('.wrapper')
const display = document.querySelector('.total_screen')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
   
    const key = e.target
    const action = key.dataset.action
    const keyItem = key.textContent
    const displayN = display.textContent
    const previousKeyType = calc.dataset.previousKeyType
    
    if (!action) {
      if (displayN === '0' || 
          previousKeyType === 'operator' || 
          previousKeyType ==='equal') 
      {
      display.textContent = keyItem
      } else {
      display.textContent = displayN + keyItem
      }
    calc.dataset.previousKeyType = 'number' 
    }
    
    
    if (action === 'dot') {
      if (!displayN.includes('.')) {
         display.textContent = displayN + '.'
      } else if (previousKeyType === 'operator' || 
                 previousKeyType === 'equal') 
      {
         display.textContent = '0.'
      }
  
    calc.dataset.previousKeyType = 'dot'
    }
    
    if (action === 'add'       ||
        action === 'minus'     ||
        action === 'multiply'  ||
        action === 'divide'    ||
        action === 'percent')
       {
       key.classList.add('is-depressed')
       calc.dataset.previousKeyType = 'operator'
       calc.dataset.firstN = displayN
       calc.dataset.operator = action
     }
    
    const pccalc = (n1) => {
    const firstN = parseFloat(n1)
    const operator = calc.dataset.operator
    if (operator === 'percent') return firstN/100
    }
    
    if (action === 'percent') {
      const firstN = calc.dataset.firstN
      display.textContent = pccalc(firstN)
      calc.dataset.previousKeyType = 'percent'
      
    }
    
    
    const calculate =(n1, operator, n2) => {
    let total = ''
    const firstN = parseFloat(n1)
    const lastN = parseFloat(n2)
    if (operator === 'add') return firstN + lastN
    if (operator === 'minus') return firstN - lastN
    if (operator === 'multiply') return firstN * lastN
    if (operator === 'divide')  return firstN / lastN
    }
  
    if (action === 'equal'){
    
      const firstN = calc.dataset.firstN
      const operator = calc.dataset.operator
      const lastN = displayN
 
    if (firstN) {
      if (previousKeyType === 'equal') {
        firstN = displayN
        lastN = calc.dataset.modN
      }
    
    display.textContent = calculate(firstN, operator, lastN)
    }
    calc.dataset.modN = lastN
    calc.dataset.previousKeyType = 'equal'
    }
    
    
    if (action === 'clear') {
     calc.dataset.firstN = ''
     calc.dataset.modN = ''
     calc.dataset.operator = ''
     calc.dataset.previousKeyType = ''
      
     display.textContent = '0'
    }

    if (action === 'off') {
     calc.dataset.firstN = ''
     calc.dataset.modN = ''
     calc.dataset.operator = ''
     calc.dataset.previousKeyType = ''
      
     display.textContent = ''
    }
    
    
    if (action === 'delete') {
      
    calc.dataset.previousKeyType = 'delete'
    }
    
    
    Array.from(key.parentNode.children)
     .forEach(k => k.classList.remove('is-depressed'))
   
  }
})