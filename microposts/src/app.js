import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

// Listen for cancel 
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// Get posts
function getPosts() {
	http.get('http://localhost:3000/posts')
		.then(data => ui.showPosts(data))
		.catch(err => console.log(err))
}

// Add posts
function submitPost() {
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const data = {
		title: title,
		body: body
		//title,
		//body (ES2015)
	}
	// Validate input
	if(title === '' || body === '') {
		ui.showAlert('Please Fill All Fields', 'alert alert-danger')
	} else {
		// check for input
		if(id === ''){
			// Create POST
			http.post(`http://localhost:3000/posts`, data)
				.then(data => {
					ui.showAlert('Post Added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch(err => console.log(err));
		} else {
			// Update POST
			http.put(`http://localhost:3000/posts/${id.value}`, data)
				.then(data => {
					ui.showAlert('Post Updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch(err => console.log(err));
		}
	}
}

// Delete posts
function deletePost(event){
	if(event.target.parentElement.classList.contains('delete')) {
		const id = event.target.parentElement.dataset.id;
		if(confirm('Are you sure?')) {
			http.delete(`http://localhost:3000/posts/${id}`)
			.then(data => {
			ui.showAlert('Post Removed', 'alert alert-success')
			getPosts();
			})
			.catch(err => console.log(err))
		}
	}
	event.preventDefault();
}

function cancelEdit(event) {
	if(event.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
	event.preventDefault();
}

// Enable edit state
function enableEdit(event) {
	if(event.target.parentElement.classList.contains('edit')) {
		const id = event.target.parentElement.dataset.id;
		const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
		const body = event.target.parentElement.previousElementSibling.textContent;
		const data = {
			id, 
			title,
			body
		}
		// Fill form with current post
		ui.fillForm(data);
	}
	event.preventDefault();
}
