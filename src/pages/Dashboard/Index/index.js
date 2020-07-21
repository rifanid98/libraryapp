import React, { useState, useEffect } from 'react'
import { decodeJwtToken } from 'utils';
import { Template as DashboardTemplate } from 'pages';
import { connect } from 'react-redux';
import { Books as BooksContent, Genres, Authors, Users, Profile } from 'components';
import { useParams } from 'react-router-dom';
import { getUsers } from 'modules';

const Index = (props) => {
  const [auth, setAuth] = useState(props.auth.data)
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
    checkRole();
    props.getUsers(auth.tokenLogin, auth.user_id);
  }, [])

  useEffect(() => {
  }, [auth])

  const checkAuth = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || props.auth.data.token.tokenLogin;
    if (!token) {
      props.history.push('/login');
    } else if (token !== "undefined") {
      const userData = decodeJwtToken(token);
      if (userData.user_id === undefined || null) {
        props.history.push('/login');
      }
    }
  }
  const checkRole = () => {
    // is not a user but higher (2,1)
    if (auth.role > 2) {
      props.history.push('/dashboard/profile')
    }
  }
  const setNewUserData = (newUserData) => {
    setAuth({
      ...auth,
      image: newUserData.image,
      full_name: newUserData.full_name
    })
  }
  return (
    <div>
      {params.page === 'books' && <DashboardTemplate
        title="Books"
        components={<BooksContent auth={auth} />}
        auth={auth}
      />}
      {params.page === 'genres' && <DashboardTemplate
        title="Genres"
        components={<Genres auth={auth} />}
        auth={auth}
      />}
      {params.page === 'authors' && <DashboardTemplate
        title="Authors"
        components={<Authors auth={auth} />}
        auth={auth}
      />}
      {params.page === 'users' && <DashboardTemplate
        title="Users"
        components={<Users auth={auth} />}
        auth={auth}
      />}
      {params.page === 'profile' && <DashboardTemplate
        title="Profile"
        components={<Profile auth={auth} setNewUserData={(newImageName) => setNewUserData(newImageName)} />}
        auth={auth}
      />}
      {params.page in pages === false && <p>Not Found</p>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  books: state.books,
  authors: state.authors,
  genres: state.genres
})

const mapDispatchToProps = {
  getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);