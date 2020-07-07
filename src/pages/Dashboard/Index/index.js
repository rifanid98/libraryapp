import React, { useState, useEffect } from 'react'
import { decodeJwtToken } from 'utils';
import { Template as DashboardTemplate } from 'pages';
import { connect } from 'react-redux';
import { Books as BooksContent } from 'components';
import { useParams } from 'react-router-dom';

const Index = (props) => {
  const [auth] = useState(props.auth.data)
  const [profile, setProfile] = useState({});
  const [books] = useState(props.books.data)
  const [authors] = useState(props.authors.data)
  const [genres] = useState(props.genres.data)
  const params = useParams();
  const pages = {
    books: 'books',
    genres: 'genres',
    authors: 'authors',
    users: 'users',
    profile: 'profile'
  }
  useEffect(() => {
    checkAuth();
  }, [])

  const checkAuth = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || props.auth.token;
    if (!token) {
      props.history.push('/login');
    } else if (token !== "undefined") {
      const userData = decodeJwtToken(token);
      if (userData.user_id === undefined || null) {
        props.history.push('/login');
      }
      setProfile({
        id: userData.user_id,
        name: userData.name,
        role: userData.role,
        image: userData.image
      })
    }
  }

  return (
    <div>
      {params.page === 'books' && <DashboardTemplate
        title="Books"
        state={profile}
        components={<BooksContent auth={auth} data={{ books, authors, genres, profile }} />}
      />}
      {params.page in pages === false && <p>Not Found</p>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  authors: state.authors,
  genres: state.genres
})

export default connect(mapStateToProps)(Index);