// library
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

// third party component
import {
  Container,
  Col,
  Row,

  Form,
  FormGroup,
  Label,
  Input,
  Button,
  // Textarea

  // NavLink, NavItem, 

  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,

  // NavbarText,

  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

  Table
} from 'reactstrap';
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';
import Slider from "react-slick";
import Swal from 'sweetalert2';

// custom component
import {
  MyModal,
  BookCard,
  SliderItem,
  SliderArrow
} from 'components';

// assets
import { bookIcon } from 'assets';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

// slider style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// custom config
import {
  createUrlParamFromObj,
  decodeJwtToken,
  convertISODate
} from 'utils';

// custom style
import style from './home.module.css';
import { connect } from 'react-redux';
import {
  getBooks,
  getCategories,
  getHistories,
  getAuthors,
  addBook
} from 'modules';

class Home extends Component {
  constructor(props) {
    document.title = `Home`;
    super(props)
    this.state = {
      isOpen: false,
      sidebarOpened: false,

      content: {
        width: 0
      },

      mdTxt: "",

      user: {
        id: 0,
        name: '',
        role: 0,
        image: ''
      },

      bookBanks: [],
      books: [],
      genres: [],
      authors: [],
      histories: [],
      myHistories: [],
      times: [],
      sorts: [],
      sliders: [],

      pagination: {
        page: 1,
        limit: 3,
        totalPage: []
      },

      searching: false,

      auth: {
        isLogin: false,
        token: this.props.auth.data.tokenLogin
      }
    }

  }

  componentDidMount() {
    this.checkAuth();
    const keyword = this.getKeyword();
    if (keyword) {
      this.getBookByKeyword(keyword);
    } else {
      this.getBooks();
    }
    this.getCategories();
    this.getHistories();
    this.getHistoriesByUserId();
    this.getAuthors();
    this.getSliders();
    this.getTimes();
    window.addEventListener('resize', this.updateDimensions);

    const contentWidth = $('#content').width();
    $('#navbar').width(contentWidth);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  // MdTextarea
  onChange = (stateName, value) => {
    this.setState({ ...this.state, [stateName]: value })
  }

  toggle = () => {
    // navbar toggle
    this.state.isOpen === true
      ? this.setState({ ...this.state, isOpen: false })
      : this.setState({ ...this.state, isOpen: true });
  }
  toggleSidebar = () => {
    // sidebar toggle
    this.state.sidebarOpened === false
      ? this.setState({ ...this.state, sidebarOpened: true }, () => {
        $(document).find('#sidebar').attr('class', 'home_sidebarOpened__1eo8p')
      })
      : this.setState({ ...this.state, sidebarOpened: false }, () => {
        $(document).find('#sidebar').attr('class', 'home_sidebar__jbvkE')
      })
  }
  updateDimensions = () => {
    this.setState({
      ...this.state,
      content: {
        width: $('#content').width()
      }
    }, () => {
      $('#navbar').width(this.state.content.width);
      console.log(this.state.content.width)
    });
  }
  getKeyword = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let keyword = params.get('search');
    return keyword;
  }
  generateBookDate = (books) => {
    const times = books;
    const tempDates = [];
    times.forEach((time) => {
      const date = convertISODate(time.added, false);
      const found = tempDates.find(element => element === date);
      if (!found) {
        tempDates.push(date)
      }
    });
    return tempDates;
  }
  checkAuth = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (!token) {
      this.props.history.push('/login');
    } else if (token !== "undefined") {
      const userData = decodeJwtToken(token);
      if (userData.user_id === undefined || null) {
        this.props.history.push('/login');
      }
      this.setState({
        ...this.state,
        user: {
          id: userData.user_id,
          name: userData.name,
          role: userData.role,
          image: userData.image
        }
      })
    }
  }
  getBooks = async () => {
    const pagination = {
      page: this.state.pagination.page,
      limit: this.state.pagination.limit
    };
    const params = createUrlParamFromObj(pagination);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token, params)
        .then((res) => {
          const data = this.props.books.data;
          const totalPage = data.totalPage;
          let pages = [];
          for (let i = 0; i < totalPage; i++) {
            pages.push(i);
          }
          const books = data.result;

          this.setState({
            ...this.state,
            bankBooks: books,
            books: books,
            sorts: books,
            pagination: {
              page: this.state.pagination.page,
              limit: this.state.pagination.limit,
              totalPage: pages
            }
          })
        }).catch((error) => {
          console.log(`get books failed`)
        })
    }
  }
  getCategories = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getCategories(token)
        .then((res) => {
          const genres = this.props.genres.data;
          this.setState({
            ...this.state,
            genres: genres
          })
        }).catch((error) => {
          console.log(`get genres (categories) failed`)
        })
    }
  }
  getBookByCategory = async (categoryName) => {
    const categories = { genre: categoryName };
    const params = createUrlParamFromObj(categories);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token, params)
        .then((res) => {
          const books = this.props.books.data;
          // const books = res.data.data;
          if (books.length > 0) {
            this.setState({
              ...this.state,
              books: books
            })
          } else {
            Swal.fire(
              'Oops',
              'there are no books in that category :(. <br>We display the available books',
              // 'success'
            ).then(() => {
              this.getBooks();
            });
          }
        }).catch((error) => {
          console.log(`get books by genre (category) failed`)
        })
    }
  }
  getBookBySort = async (sortBy) => {
    const sort = { sort: sortBy };
    const params = createUrlParamFromObj(sort);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token, params)
        .then((res) => {
          const books = this.props.books.data;
          if (books.length > 0) {
            this.setState({
              ...this.state,
              books: books
            })
          } else {
            Swal.fire(
              'Oops',
              'there are no books in that category :(. <br>We display the available books',
              // 'success'
            ).then(() => {
              this.getBooks();
            });
          }
        }).catch((error) => {
          console.log(`get books by genre (category) failed`)
        })
    }
  }
  getBookByDate = async (getDate) => {
    const date = { added: getDate };
    const params = createUrlParamFromObj(date);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token, params)
        .then((res) => {
          const books = this.props.books.data;
          if (books.length > 0) {
            this.setState({
              ...this.state,
              books: books
            })
          } else {
            Swal.fire(
              'Oops',
              'there are no books in that date :(. <br>We display the available books',
              // 'success'
            ).then(() => {
              this.getBooks();
            });
          }
        }).catch((error) => {
          console.log(`get books by date failed`)
        })
    }
  }
  getHistories = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getHistories(token)
        .then((res) => {
          // console.log(res);
          const histories = this.props.histories.data;
          this.setState({
            ...this.state,
            histories: histories
          })
        }).catch((error) => {
          console.log(`get histories (categories) failed`)
        })
    }
  }
  getHistoriesByUserId = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      const userData = decodeJwtToken(token);
      const search = { user_id: userData.user_id };
      const params = createUrlParamFromObj(search);
      this.props.getHistories(token, params)
        .then((res) => {
          const histories = this.props.histories.data
          this.setState({
            ...this.state,
            myHistories: histories
          })
        }).catch((error) => {
          console.log(`get my histories failed`)
        })
    }

  }
  getSliders = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token)
        .then((res) => {
          const sliders = this.props.books.data;
          this.setState({
            ...this.state,
            sliders: sliders
          })
        }).catch((error) => {
          console.log(`get sliders (categories) failed`)
        })
    }
  }
  getTimes = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getBooks(token)
        .then((res) => {
          const books = this.props.books.data;
          const times = this.generateBookDate(books);
          this.setState({
            ...this.state,
            times: times
          })
        }).catch((error) => {
          console.log(`get times (categories) failed`)
        })
    }
  }
  getBookByKeyword = async (keyword) => {
    if (keyword.length < 1) {
      this.getBooks()
    } else {
      const search = {
        author: keyword,
        genre: keyword,
        description: keyword,
        title: keyword,
        added: keyword,
        page: this.state.pagination.page,
        limit: this.state.pagination.limit
      }
      const params = createUrlParamFromObj(search);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
      if (token) {
        this.props.getBooks(token, params)
          .then((res) => {
            console.log(this.props.data, 'get books by keyword')
            const totalPage = this.props.books.data.totalPage;
            let pages = [];
            for (let i = 0; i < totalPage; i++) {
              pages.push(i);
            }
            const books = this.props.books.data.result;
            this.setState({
              ...this.state,
              books: books,
              pagination: {
                page: this.state.pagination.page,
                limit: this.state.pagination.limit,
                totalPage: pages
              }
            })
          }).catch((error) => {
            console.log(`get books by keyword failed`)
          })
      }
    }
  }
  getAuthors = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      this.props.getAuthors(token)
        .then((res) => {
          const authors = this.props.authors.data;
          this.setState({
            ...this.state,
            authors: authors
          })
        }).catch((error) => {
          console.log(`get authors failed`)
        })
    }
  }
  addBook = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token') || localStorage.getItem('token') || this.state.auth.token;
    if (token) {
      const formData = new FormData(event.target);
      this.props.addBook(token, formData)
        .then((res) => {
          console.log(res.value.status, 'status')
          if (res.value.status === 201) {
            Swal.fire(
              'Add Book Success!',
              'book added successfully.',
              'success'
            ).then(() => {
              $(document).find('#addBookModal').click()
            })
          }
        }).catch((error) => {
          // console.log(error.response.data.message);
          if (error.response.data.message) {
            Swal.fire(
              'Add Book Failed!',
              `${error.response.data.message}`,
              'error'
            )
          } else if (error.response.data.error.message) {
            Swal.fire(
              'Add Book Failed!',
              `${error.response.data.error.message}`,
              'error'
            )
          } else {
            Swal.fire(
              'Add Book Failed!',
              'Please try again',
              'error'
            )
          }
        })
    }
  }
  getBooksByPage = (page) => {
    this.setState({
      ...this.state,
      pagination: {
        page: page,
        limit: this.state.pagination.limit,
        totalPage: this.state.pagination.totalPage
      }
    }, () => {
      this.getBooks();
    })
  }
  setLimitData = (totalData) => {
    totalData > 0
      && this.setState({
        ...this.state,
        pagination: {
          page: this.state.pagination.page,
          limit: parseInt(totalData),
          totalPage: this.state.pagination.totalPage
        }
      }, () => {
        this.getBooks();
      })
  }
  searchBooks = event => {
    event.preventDefault();
    const keyword = event.target.search.value;
    this.props.history.push(`/home?search=${keyword}`);
    if (keyword) {
      this.getBookByKeyword(keyword);
    } else {
      this.getBooks();
    }
  }

  render() {
    // slider settings
    const settings = {
      dots: true,
      infinite: true,
      centerMode: true,
      className: "center",
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      nextArrow: <SliderArrow />,
      prevArrow: <SliderArrow />,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    // const allHistories = <Table style={{ textAlign: 'center' }}>
    //   <thead>
    //     <tr>
    //       <th>No.</th>
    //       <th>Book Title</th>
    //       <th>User</th>
    //       <th>Date</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {this.state.histories.map((history, index) => {
    //       return (
    //         <tr key={index}>
    //           <th scope="row">{index + 1}</th>
    //           <td>{history.title.substring(0, 40)}...</td>
    //           <td>{history.username}</td>
    //           <td>{convertISODate(history.updated)}</td>
    //         </tr>
    //       )
    //     })}
    //   </tbody>
    // </Table>;

    const myHistories = <Table style={{ textAlign: 'center' }}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Book Title</th>
          <th>User</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {this.state.myHistories.map((history, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{history.title.substring(0, 40)}...</td>
              <td>{history.username}</td>
              <td>{convertISODate(history.updated)}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>;
    // modal body
    const historyModalBody = <div>
      {/* <Button color="warning" onClick={() => { $('#histories').html(allHistories) }}>All Histories</Button> */}
      {/* &nbsp; */}
      {/* <Button color="warning" onClick={() => { $('#histories').html(myHistories) }}>My Histories</Button> */}
      <div id="histories">
        {myHistories}
      </div>
    </div>
    const addModalBody = <div>
      <Form onSubmit={this.addBook}>
        <FormGroup>
          <Label for="">Title</Label>
          <Input type="text" name="title" placeholder="title here" required />
        </FormGroup>
        <FormGroup>
          <Label for="l">Image</Label>
          <Input type="file" name="image" />
        </FormGroup>
        <FormGroup>
          <Label for="">Author</Label>
          <Input type="select" name="author_id" required>
            {this.state.authors.map(author => {
              return (
                <option key={author.author_id} value={author.author_id}>{author.name}</option>
              )
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="">Genre</Label>
          <Input type="select" name="genre_id" required>
            {this.state.genres.map(genre => {
              return (
                <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
              )
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="">Status</Label>
          <Input type="select" name="status" required>
            <option key="0" value="0">Available</option>
            <option key="1" value="1">Not Available</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="">Quantity</Label>
          <Input type="number" name="quantity" placeholder="quantity" min="1" pattern="[0-9]" required />
        </FormGroup>
        <FormGroup>
          <Label for="">Description</Label>
          <MdTextarea
            name="description"
            rows={10}
            onChange={(e) => this.onChange('mdTxt', e.target.value)}
            value={this.state.mdTxt}
            allowFilteredHtml={true}
            min="50"
            required
          />
        </FormGroup>
        <Button color="warning" className="float-right">Save</Button>
      </Form>
    </div>
    // book lists
    const bookLists = []
    this.state.books.length > 0 && this.state.books.map(book => bookLists.push(<BookCard key={book.book_id} history={this.props.history} bookId={book.book_id} cardImage={book.image} cardTitle={`${book.title.substring(0, 18)}...`} cardText={`${book.description.substring(0, 100)}... `} cardFooter={`by [${book.author_name}][${book.genre_name}]`} />))
    const slideItems = []
    this.state.sliders.length > 0 && this.state.sliders.map(book => slideItems.push(<SliderItem key={book.book_id} id={book.book_id} slideImage={book.image} />))

    return (
      <Container fluid className={style.container}>
        <Row classID={style.wrapper}>
          {/* Sidebar */}
          <div className={style.sidebar} id="sidebar">
            {/* Sidebar Toggle */}
            <Row>
              <div className={style.sidebarToggle1} onClick={this.toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon} />
              </div>
            </Row>
            {/* Profile Preview */}
            <Row>
              <div className={style.profile}>
                {/* Profile Avatar */}
                <Row>
                  <Col className={style.profileAvatar}>
                    <img src={this.state.user.image} alt="" />
                    {/* <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80" alt="" /> */}
                  </Col>
                </Row>
                {/* Profile Name */}
                <Row>
                  <Col className={style.profileName}>
                    {this.state.user.name}
                  </Col>
                </Row>
              </div>
            </Row>
            {/* Navigation */}
            <Row>
              <div className={style.navigation}>
                <Nav vertical className={style.nav}>
                  <Link className="nav-link" to="/home">Explore</Link>
                  <MyModal id="historyModal" modalTitle="Histories" modalBody={historyModalBody} size="lg" />
                  <Link className="nav-link" to="#" onClick={() => { $('#historyModal').click() }}>History</Link>
                  <MyModal id="addBookModal" modalTitle="Add Data" modalBody={addModalBody} size="lg" />
                  {this.state.user.role < 3 && <Link className="nav-link" to="#" onClick={() => { $('#addBookModal').click() }}>Add Book*</Link>}
                  {this.state.user.role < 3 && <Link className="nav-link" to="/dashboard">Dashboard*</Link>}
                  <Link className="nav-link" to="/logout">Log Out</Link>
                </Nav>
              </div>
            </Row>
          </div>

          {/* Content */}
          <Col className={style.content} id="content">
            {/* Navbar */}
            <Row>
              <Col style={{ padding: '0px' }}>
                <Navbar color="white" light expand="md" className={style.navbar} id="navbar">
                  <div className={style.sidebarToggle2} onClick={this.toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} className={style.sidebarToggleIcon} />
                  </div>
                  {/* navbar brand top */}
                  <NavbarBrand href="/" id={style.navbarBrandTop}>
                    <img src={bookIcon} alt="" />Library
									</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} style={{ border: 'none' }} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    {/* navbar menu */}
                    <Nav className="mr-auto" navbar>
                      {/* All Categories */}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          All Categories
												</DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem key={0} onClick={() => { this.getBooks() }}>Show All</DropdownItem>
                          <DropdownItem divider />
                          {this.state.genres.map(genre => {
                            return (
                              <DropdownItem key={genre.genre_id} onClick={() => { this.getBookByCategory(genre.name) }}>{genre.name}</DropdownItem>
                            )
                          })}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* All Times */}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          All Times
												</DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem key={0} onClick={() => { this.getBooks() }}>Show All</DropdownItem>
                          <DropdownItem divider />
                          {this.state.times.map((time, index) => <DropdownItem key={index} onClick={() => { this.getBookByDate(time) }}>{time}</DropdownItem>)}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* Sort */}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Sort
												</DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem key={0} onClick={() => { this.getBooks() }}>Reset</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem key="1" onClick={() => { this.getBookBySort('title') }}>title</DropdownItem>
                          <DropdownItem key="2" onClick={() => { this.getBookBySort('author_name') }}>author</DropdownItem>
                          <DropdownItem key="3" onClick={() => { this.getBookBySort('genre_name') }}>genre</DropdownItem>
                          <DropdownItem key="4" onClick={() => { this.getBookBySort('description') }}>description</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* Show Page */}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                          Show:
                      </DropdownToggle>
                      </UncontrolledDropdown>
                      <form className="navbar-form pull-left" style={{ width: '70px' }}>
                        <select name="" id="" className="form-control" defaultValue={this.state.pagination.limit} onChange={(e) => { this.setLimitData(e.target.value) }}>
                          <option key="1" value="1">1</option>
                          <option key="2" value="2">2</option>
                          <option key="3" value="3">3</option>
                          <option key="4" value="4">4</option>
                          <option key="5" value="5">5</option>
                          <option key="6" value="6">6</option>
                        </select>
                      </form>
                    </Nav>
                    {/* search input */}
                    <Form className="mx-2 my-auto d-inline w-100" onSubmit={(e) => this.searchBooks(e)}>
                      <div className="input-group">
                        <div id={style.space}></div>
                        <span className="input-group-append">
                          <button className={style.searchButton} onClick={null}>
                            <FontAwesomeIcon icon={faSearch} className={style.searchIcon} />
                          </button>
                        </span>
                        <input type="text" name="search" className="form-control" id={style.searchInput} placeholder="Search Book" />
                        {/* <input type="text" className="form-control" id={style.searchInput} placeholder="Search Book" onChange={(e) => { this.getBookByKeyword(e) }} /> */}
                        <div id={style.space}></div>
                      </div>
                    </Form>
                  </Collapse>
                  {/* navbar brand bottom */}
                  <NavbarBrand href="/" id={style.navbarBrandBottom}>
                    <img src={bookIcon} alt="" />Library
									</NavbarBrand>
                </Navbar>
              </Col>
            </Row>
            {/* slider */}
            <Row>
              <Col className={style.slider}>
                <div>
                  <Slider {...settings}>
                    {slideItems}
                  </Slider>
                </div>
              </Col>
            </Row>
            {/* Book Lists */}
            <Row>
              <Col className={style.bookLists}>
                <p>Book Lists</p>
                <Row>
                  {bookLists}
                  <div className="buttonWrapper" style={{
                    width: '100%',
                    marginLeft: '15px',
                    textAlign: 'center',
                    padding: 'auto',
                    // display: this.state.searching ? 'none' : 'block'
                  }}>
                    {/* Pagination */}
                    <Button color="warning" onClick={() => { this.getBooksByPage(this.state.pagination.page - 1) }} disabled={this.state.pagination.page === 1 ? true : false}>Prev</Button>
                    {this.state.pagination.totalPage.map(page => {
                      return (
                        <Button key={page} color={this.state.pagination.page === page + 1 ? 'primary' : 'warning'} style={{ margin: '0 5px' }} onClick={() => { this.getBooksByPage(page + 1) }}>{page + 1}</Button>
                      )
                    })}
                    <Button color="warning" onClick={() => { this.getBooksByPage(this.state.pagination.page + 1) }} disabled={this.state.pagination.page === this.state.pagination.totalPage.length ? true : false}>Next</Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  genres: state.genres,
  histories: state.histories,
  authors: state.authors,
})

const mapDispatchToProps = {
  getBooks,
  getCategories,
  getHistories,
  getAuthors,
  addBook
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);