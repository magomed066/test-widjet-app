import service from '../service/Service'
import state from '../state/State'

class ResList {
	parent = document.querySelector('.res-list')

	constructor() {
		this.addListener()
	}

	renderList(data) {
		if (!data.length) {
			this.clear()
			this.removeListener()
			return
		}

		const html = data
			.map(
				(item) => `
          <div class="res-list__item" data-kpp="${item.data.kpp}">
            <h4>${item.value}</h4>
            <p>
              ${item?.data?.kpp} ${item?.data?.address?.value}
            </p>
          </div>
        `,
			)
			.join('')

		this.clear()
		this.parent.insertAdjacentHTML('beforeend', html)
	}

	listener(e) {
		const target = e.target
		const el = target.closest('.res-list__item')
		const kpp = el.dataset.kpp

		const res = service.getByKPP(kpp)

		const oldState = state.getState()

		state.setState({
			...oldState,
			result: res,
		})
		this.clear()
	}

	addListener() {
		this.parent.addEventListener('click', this.listener.bind(this))
	}

	removeListener() {
		this.parent.removeEventListener('click', this.listener)
	}

	clear() {
		this.parent.innerHTML = ''
	}
}

export default new ResList()
