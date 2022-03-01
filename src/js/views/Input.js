import service from '../service/Service'
import state from '../state/State'
import List from './List'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .textfield {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      padding: 10px;
    }
  </style>
  <div class="textfield">
    <label></label>
    <input type="text"/> 
  </div>
`

class Input extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.shadowRoot.querySelector('label').textContent =
			this.getAttribute('label')

		this.shadowRoot.querySelector('input').placeholder =
			this.getAttribute('placeholder')
		this.shadowRoot.querySelector('input').value = this.getAttribute('value')

		this.shadowRoot.querySelector('input').name = this.getAttribute('name')
		this.shadowRoot.querySelector('input').id = this.getAttribute('id')
		this.shadowRoot.querySelector('input').type =
			this.getAttribute('type') || 'text'
		this.shadowRoot.querySelector('input').disabled = this.getAttribute(
			'disabled',
		)
			? true
			: false
	}

	onChange(e) {
		const value = e.target.value
		service.getData(value).then((res) => {
			state.setState({
				results: res.suggestions,
				value,
			})
		})
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector('input')
			.addEventListener('input', this.onChange)
	}

	static get observedAttributes() {
		return ['value']
	}

	disconnectedCallback() {
		this.shadowRoot.querySelector('input').removeEventListener()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'value') {
			this.shadowRoot.querySelector('input').value = newValue
		}
	}
}

window.customElements.define('custom-input', Input)

export default new Input()
