// *******************************************
// Глобальный стейт
class State {
	listener = []
	state = {
		results: [],
		value: '',
		result: {},
		loading: false,
	}

	static instanse

	static getInstanse() {
		if (this.instanse) {
			return this.instanse
		}

		this.instanse = new State()
		return this.instanse
	}

	addListener(fn) {
		this.listener.push(fn)
	}

	update() {
		for (const fn of this.listener) {
			fn()
		}
	}

	setState(obj) {
		this.state = {
			...obj,
		}

		this.update()
	}

	getState() {
		return this.state
	}
}

const state = State.getInstanse()

export default state
