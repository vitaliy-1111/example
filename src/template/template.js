export default function itemTemplate({ id, label, checked }) {
  return `<li data-id=${id} class="list-group-item list-group-item-action">
    <label>
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <span>${label}</span>
    </label>
    <button type="button" class="btn btn-danger">x</button>
  </li>`;
}