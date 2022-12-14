let notes = [
  {
    id: 'notes-1',
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 'notes-2',
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 'notes-3',
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 'notes-4',
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 'notes-5',
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 'notes-6',
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  }
];

const getAllNotes = () => {
  return notes;
};

const getNote = (id) => {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
};

const addNote = ({ title, body }) => {
  notes = [
    ...notes,
    {
      id: `notes-${+new Date()}`,
      title: title || '(untitled)',
      body,
      createdAt: new Date().toISOString(),
      archived: false
    }
  ];
};

const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};

const handleArchiveNote = (id) => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        archived: note.id === id ? !note.archived : note.archived
      };
    }
    return note;
  });
};

const editNote = ({ id, title, body }) => {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title || noteToEdit.title;
  noteToEdit.body = body || noteToEdit.body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
};

const getNavigationsLink = {
  en: [
    {
      text: 'Active Notes',
      value: 'active',
      link: '/'
    },
    {
      text: 'Archived Notes',
      value: 'archived',
      link: '/archived'
    }
  ],
  id: [
    {
      text: 'Catatan Aktif',
      value: 'active',
      link: '/'
    },
    {
      text: 'Catatan Arsip',
      value: 'archived',
      link: '/archived'
    }
  ]
};

const templateTextEmpty = {
  en: {
    empty_note: 'You Do Not Have a Note',
    empty_archived: 'No Archived Note',
    empty_active: 'No Active Note',
    not_found: 'Note Is Not Found'
  },
  id: {
    empty_note: 'Kamu Tidak Memiliki Catatan',
    empty_archived: 'Tidak Ada Catatan Diarsipkan',
    empty_active: 'Tidak Ada Catatan Aktif',
    not_found: 'Catatan Tidak Ditemukan'
  }
};

const generateQuotes = () => [
  {
    text: 'I haven???t failed. I???ve just found 10.000 ways that won???t work.',
    author: 'Thomas Alva Edison'
  },
  {
    text: 'However difficult life may seem, there is always something you can do and succeed at. It matters that you don???t just give up.',
    author: 'Stephen Hawking'
  },
  {
    text: 'Try not to become a man of success, but rather try to become a man of value.',
    author: 'Albert Einstein'
  },
  {
    text: 'The only way to di great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    text: 'A new idea must not be judged by its immediate results.',
    author: 'Nikolas Tesla'
  },
  {
    text: 'Di mana pun engkau berada selalulah menjadi yang terbaik dan berikan yang terbaik dari yang bisa kau berikan',
    author: 'B.J Habibie'
  }
];

export {
  getAllNotes,
  deleteNote,
  editNote,
  getNote,
  handleArchiveNote,
  addNote,
  getNavigationsLink,
  templateTextEmpty,
  generateQuotes
};
