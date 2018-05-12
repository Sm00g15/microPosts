import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

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
	// Create POST
	http.post('http://localhost:3000/posts', data)
		.then(data => {
			ui.showAlert('Post Added', 'alert alert-success');
			ui.clearFields();
			getPosts();
		})
		.catch(err => console.log(err));
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
