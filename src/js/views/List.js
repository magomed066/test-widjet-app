import service from '../service/Service'
import state from '../state/State'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .list {
      list-style: none;
      position: absolute;
      top: 60px;
      right: 0;
      left: 0;
      background: #fff;
      box-shadow: 2px 1px 10px rgb(139, 139, 139);
      padding: 0;
    }

    .list-item {
      padding: 20px;
      cursor: pointer;
      transition: all .3s;
    }
    
    .list-item h4 {
      margin-bottom: 10px;
    }
    
    .list-item p {
      line-height: 20px;
    }

    .list-item:hover {
      background: rgb(139, 139, 139);
    }
  </style>
  <ul class="list">
   
  </ul>
`

class List extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector('.list')
			.addEventListener('click', this.listener.bind(this))

		const list = this.shadowRoot.querySelector('.list')

		state.addListener(() => {
			const { results } = state.getState()

			if (results.length) {
				list.innerHTML = this.outputHtml(results)
			} else {
				list.innerHTML = ''
			}
		})
	}

	disconnectedCallback() {
		this.shadowRoot.querySelector('.list').removeEventListener()
	}

	listener(e) {
		const target = e.target
		const el = target.closest('.list-item')
		const kpp = el?.dataset.kpp

		const res = service.getByKPP(kpp)

		const oldState = state.getState()

		state.setState({
			...oldState,
			result: res,
		})

		this.shadowRoot.querySelector('.list').innerHTML = ''
	}

	outputHtml(data = []) {
		const html = data
			.map(
				(item) => `
          <li class="list-item" data-kpp="${item.data.kpp}">
            <h4>${item.value}</h4>
            <p>
              ${item?.data?.kpp} ${item?.data?.address?.value}
            </p>
          </д>
        `,
			)
			.join('')

		return html
	}

	clear() {
		this.shadowRoot.querySelector('.list').innerHTML = ''
	}
}

window.customElements.define('custom-list', List)

export default new List()
