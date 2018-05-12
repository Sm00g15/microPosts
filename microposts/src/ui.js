class UI {
	constructor() {
		this.post = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	showPosts(posts) {
		let output = '';
		posts.forEach((post) => {
			output += `
			<div class="card mb-3">
				<div class="card-body">
					<h4 class="card-title">${post.title}</h4>
					<p class="card-text">${post.body}</p>
					<a href="#" class="edit card-link" data-id="${post.id}">
						<i class="fa fa-pencil"></i>
					</a>
					<a href="#" class="delete card-link" data-id="${post.id}">
						<i class="fa fa-remove"></i>
					</a>
				</div>
			</div>
			`
		});
		this.post.innerHTML = output; 
	}

	showAlert(message, className) {
		this.clearAlert();
		// Create div
		const div = document.createElement('div');
		// Add classes
		div.className = className;
		// Add text
		div.appendChild(document.createTextNode(message));
		// Get parent
		const container = document.querySelector('.postsContainer');
		// Get posts div
		const post = document.querySelector('#posts');
		// Insert alert in posts div
		container.insertBefore(div, posts)
		// Timeout 
		setTimeout(() => {
			this.clearAlert();
		}, 3000)
	}
	clearAlert() {
		const currentAlert = document.querySelector('.alert');
		if(currentAlert) {
			currentAlert.remove();
		}
	}
	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}
	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}

	// Clear ID hidden value
	clearIdInput() {
		this.idInput.value = '';
	}

	// Change the form state
	changeFormState(type) {
		if(type === 'edit') {
			this.postSubmit.textContent = 'Update post'
			this.postSubmit.classList.remove('btn-primary')
			this.postSubmit.classList.add('btn-danger')
			const cancelButton = document.createElement('button')
			cancelButton.classList.add('post-cancel', 'btn', 'btn-block', 'btn-light')
			cancelButton.textContent = 'Cancel'
			this.postSubmit.insertAdjacentElement('afterend', cancelButton)
		} else {
			this.postSubmit.textContent = 'Post It'
			this.postSubmit.classList.remove('btn-danger')
			this.postSubmit.classList.add('btn-primary');
			if(document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}
			// clear ID from hidden field
			this.clearIdInput();
			// clear text
			this.clearFields();
		}
	}
}

export const ui = new UI();