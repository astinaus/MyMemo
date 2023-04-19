const titleId = document.getElementById('title');
const contentId = document.getElementById('content');
let allMemo = JSON.parse(localStorage.getItem('allMemo'));

allMemo = allMemo ?? [];
render();

function saveNote() {
  const title = titleId.value;
  const content = contentId.value;

  if (!title || !content) return alert('제목과 내용을 입력해주세요.');

  allMemo.push({ title, content, len: allMemo.length });

  localStorage.setItem('allMemo', JSON.stringify(allMemo));
  render();

  titleId.value = '';
  contentId.value = '';
}

function render() {
  const output = document.getElementById('output');
  output.innerHTML = '';

  allMemo.forEach((memo) => {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const span = document.createElement('span');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    article.setAttribute('class', 'memo');
    h2.textContent = memo.title;
    span.textContent = memo.len + 1;
    p.textContent = memo.content;
    btn.textContent = '삭제';
    btn.setAttribute('id', memo.len);
    btn.setAttribute('onclick', 'removeMemo()');

    article.appendChild(h2);
    article.appendChild(span);
    article.appendChild(p);
    article.appendChild(btn);

    output.appendChild(article);
  });
}

function removeMemo() {
  const check = confirm('삭제하시겠습니까?');
  if (check) {
    const idx = allMemo.find((item) => item.len == event.srcElement.id);

    if (idx) {
      allMemo.splice(
        allMemo.findIndex((item) => item.len == idx.len),
        1
      );
    }

    localStorage.setItem('allMemo', JSON.stringify(allMemo));
    render();
  } else return;
}
