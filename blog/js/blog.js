const API_KEY = 'AIzaSyDSvlQ96zJMWQ-MufOVEzI2j-aaVOVWo-g';
const BLOG_ID = '2149380964696143187';
const maxPosts = 2; // Number of posts to display

// Function to fetch blog posts from Blogger API
async function fetchBlogPosts() {
  try {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${maxPosts}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to display blog posts
async function displayBlogPosts() {
  const postsContainer = document.getElementById('blog-posts');
  const posts = await fetchBlogPosts();

  posts.forEach(post => {
    const postDate = new Date(post.published).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const postHTML = `
      <div class="col-lg-6">
        <div class="mil-blog-card mil-mb-60">
          <div class="mil-cover-frame mil-up">
            <img src="img/blog/3.jpg" alt="cover">
          </div>
          <div class="mil-post-descr">
            <div class="mil-labels mil-up mil-mb-30">
              <div class="mil-label mil-upper">${postDate}</div>
            </div>
            <h4 class="mil-up mil-mb-30" onclick="window.open('${post.url}', '_blank')">${post.title}</h4>
            <span class="mil-link mil-dark mil-arrow-place mil-up" onclick="window.open('${post.url}', '_blank')">Read More</span>
          </div>
        </div>
      </div>
    `;

    postsContainer.insertAdjacentHTML('beforeend', postHTML);
  });
}

// Call displayBlogPosts when the page loads
window.onload = displayBlogPosts;
