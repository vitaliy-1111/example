import * as basicLightbox from 'basiclightbox';
export const deleteModal = basicLightbox.create(`
<div class="delete-modal">
	<h1>Do you really want to delete this item?</h1>
	<p id="text">lorem ipsum</p>
  <button class="btn btn-light">Cancel</button>
  <button class="btn btn-danger">Delete</button>
</div>
`);
export const loadingModal = basicLightbox.create(
  `
<div class="loading-modal">
  <p>please wait...</p>
</div>
`,
  { closable: false },
);
export function getRefs() {
  return {
    form: document.querySelector('form'),
    listGroup: document.querySelector('ul.list-group'),
    printBtn: document.querySelector('.btn.btn-success'),
    modalText: deleteModal.element().querySelector('#text'),
   modalCancelButton: deleteModal.element().querySelector('.btn-light'),
   modalDeleteButton: deleteModal.element().querySelector('.btn-danger'),
  }
}