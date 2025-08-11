// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    const userNameElement = document.getElementById('user-name');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const booksGrid = document.querySelector('.books-grid');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
  
    // Book catalog (would come from Firestore in a real app)
    const allBooks = [
      {
        title: 'The Great Adventure',
        author: 'John Smith',
        category: 'Fiction, Adventure',
        status: 'available'
      },
      {
        title: 'Data Structures & Algorithms',
        author: 'Jane Doe',
        category: 'Computer Science, Education',
        status: 'borrowed'
      },
      {
        title: 'The History of Everything',
        author: 'Robert Johnson',
        category: 'History, Science',
        status: 'available'
      },
      {
        title: 'Introduction to Psychology',
        author: 'Sarah Williams',
        category: 'Psychology, Science',
        status: 'available'
      },
      {
        title: 'Web Development Mastery',
        author: 'Michael Brown',
        category: 'Technology, Programming',
        status: 'available'
      },
      {
        title: 'Artificial Intelligence Basics',
        author: 'Emily Chen',
        category: 'Computer Science, AI',
        status: 'borrowed'
      },
      {
        title: 'The Art of Cooking',
        author: 'Gordon Chef',
        category: 'Cooking, Lifestyle',
        status: 'available'
      },
      {
        title: 'Financial Freedom',
        author: 'Warren Money',
        category: 'Finance, Self-Help',
        status: 'available'
      }
    ];
  
    // Current filtered books
    let filteredBooks = [...allBooks];
    
    // Check authentication state
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        userNameElement.textContent = `Welcome, ${user.displayName || user.email}`;
        
        // Load books from the database
        loadBooks();
      } else {
        // User is signed out, redirect to login page
        window.location.href = 'index.html';
      }
    });
  
    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut()
          .then(() => {
            window.location.href = 'index.html';
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      });
    }
  
    // Search functionality
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchBooks(searchTerm);
      });
    }
  
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const searchTerm = searchInput.value.trim().toLowerCase();
          searchBooks(searchTerm);
        }
      });
    }
  
    // Pagination functionality
    paginationButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get page number and load books for that page
        const page = button.textContent === 'Next →' ? 
          parseInt(document.querySelector('.pagination-btn.active').textContent) + 1 : 
          parseInt(button.textContent);
        
        loadBooks(page);
      });
    });
  
    // Function to load books from database
    function loadBooks(page = 1) {
      // Clear existing books
      booksGrid.innerHTML = '';
      
      const booksPerPage = 6;
      
      // Calculate start and end index based on page number
      const startIndex = (page - 1) * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      const booksToShow = filteredBooks.slice(startIndex, endIndex);
      
      // Check if there are any books
      if (booksToShow.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
          <h3>No books found</h3>
          <p>Try a different search term or clear your search</p>
          <button class="clear-search-btn">Clear Search</button>
        `;
        
        const clearBtn = noResults.querySelector('.clear-search-btn');
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          filteredBooks = [...allBooks];
          loadBooks();
        });
        
        booksGrid.appendChild(noResults);
      } else {
        // Render books
        booksToShow.forEach((book, index) => {
          renderBook(book, startIndex + index);
        });
      }
      
      // Update pagination
      updatePagination(page, Math.ceil(filteredBooks.length / booksPerPage));
    }
  
    // Function to render a book
    function renderBook(book, index) {
      const bookElement = document.createElement('div');
      bookElement.className = 'book-item';
      
      bookElement.innerHTML = `
        <div class="book-image">
          <div class="book-cover">Book ${index + 1}</div>
        </div>
        <div class="book-details">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">by ${book.author}</p>
          <p class="book-category">${book.category}</p>
          <div class="book-status ${book.status}">${book.status === 'available' ? 'Available' : 'Borrowed'}</div>
          <div class="book-actions">
            <button class="btn-${book.status === 'available' ? 'borrow' : 'reserve'}">${book.status === 'available' ? 'Borrow' : 'Reserve'}</button>
            <button class="btn-details">Details</button>
          </div>
        </div>
      `;
      
      // Add event listeners for buttons
      const borrowButton = bookElement.querySelector(`.btn-${book.status === 'available' ? 'borrow' : 'reserve'}`);
      const detailsButton = bookElement.querySelector('.btn-details');
      
      borrowButton.addEventListener('click', () => {
        handleBookAction(book, book.status === 'available' ? 'borrow' : 'reserve');
      });
      
      detailsButton.addEventListener('click', () => {
        showBookDetails(book);
      });
      
      booksGrid.appendChild(bookElement);
    }
  
    // Update pagination buttons based on current page and total pages
    function updatePagination(currentPage, totalPages) {
      const paginationContainer = document.querySelector('.pagination');
      
      // Clear existing buttons except "Next"
      const buttons = Array.from(paginationContainer.querySelectorAll('.pagination-btn'));
      const nextButton = buttons.pop(); // Remove the Next button from the array
      
      buttons.forEach(button => button.remove());
      
      // Add page buttons
      for (let i = 1; i <= Math.min(totalPages, 3); i++) {
        const button = document.createElement('button');
        button.className = 'pagination-btn';
        button.textContent = i.toString();
        
        if (i === currentPage) {
          button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
          loadBooks(i);
        });
        
        paginationContainer.insertBefore(button, nextButton);
      }
      
      // Update Next button
      nextButton.disabled = currentPage >= totalPages;
    }
  
    // Function to search books
    function searchBooks(searchTerm) {
      if (!searchTerm) {
        // If search is empty, show all books
        filteredBooks = [...allBooks];
      } else {
        // Filter books by title, author, or category
        filteredBooks = allBooks.filter(book => {
          return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm)
          );
        });
      }
      
      // Show visual feedback on search
      searchInput.classList.add('searching');
      setTimeout(() => {
        searchInput.classList.remove('searching');
      }, 300);
      
      // Reset to page 1 after search
      loadBooks(1);
      
      // Update UI to show search status
      const searchStatus = document.createElement('div');
      searchStatus.classList.add('search-status');
      
      if (searchTerm && filteredBooks.length > 0) {
        const resultsMessage = document.createElement('p');
        resultsMessage.textContent = `Found ${filteredBooks.length} books matching "${searchTerm}"`;
        resultsMessage.classList.add('search-results-message');
        
        // Find the books-toolbar element
        const toolbarElement = document.querySelector('.books-toolbar');
        
        // Check if there's already a search-results-message
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        // Insert the message after the h2 but before the search box
        toolbarElement.insertBefore(resultsMessage, document.querySelector('.search-box'));
      }
    }
  
    // Function to handle book actions (borrow/reserve)
    function handleBookAction(book, action) {
      // In a real app, this would update the book status in Firestore
      console.log(`${action} book: ${book.title}`);
      
      // Simulate a status change
      const bookIndex = allBooks.findIndex(b => b.title === book.title);
      if (bookIndex !== -1) {
        allBooks[bookIndex].status = action === 'borrow' ? 'borrowed' : 'available';
        
        // Update filtered books as well
        filteredBooks = filteredBooks.map(b => {
          if (b.title === book.title) {
            return {...b, status: action === 'borrow' ? 'borrowed' : 'available'};
          }
          return b;
        });
      }
      
      // Show confirmation message
      alert(`Book "${book.title}" ${action === 'borrow' ? 'borrowed' : 'reserved'} successfully.`);
      
      // Reload books to reflect changes
      loadBooks();
    }
  
    // Function to show book details
    function showBookDetails(book) {
      // In a real app, this might open a modal with detailed information
      console.log(`Showing details for: ${book.title}`);
      
      alert(`
        Title: ${book.title}
        Author: ${book.author}
        Category: ${book.category}
        Status: ${book.status === 'available' ? 'Available' : 'Borrowed'}
      `);
    }
  }); 
