import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import Form from './Form';
import Meal from './Meal';
import Menu from './Menu';
import HomeCarousel from "./Carousel/Carousel";
import TeamMemberCard from '../../../components/UI/TeamMemberCard/TeamMemberCard';

import './Home.css';

import ImgDemoMeal from '../../../assets/images/demo-meal.jpeg';
import ImgGreaterOccasion from '../../../assets/images/greater-occasion.jpeg';
import ImgTraditionalMeal from '../../../assets/images/traditional-meal.jpeg';
import ImgValentineMeal from '../../../assets/images/valentine-meal.jpeg';
import ImgSpecialOccasion from '../../../assets/images/special-occasion.jpeg';
import ImgCorporateMeal from '../../../assets/images/corporate-meal.jpeg';
import ImgBottles from '../../../assets/images/bottles.jpeg';
import ImgChicken from '../../../assets/images/chicken.jpeg';
import ImgTastyMenu1 from '../../../assets/images/tasty-menu-1.jpeg';
import ImgTastyMenu2 from '../../../assets/images/tasty-menu-2.jpeg';
import ImgTastyMenu3 from '../../../assets/images/tasty-menu-3.jpeg';
import ImgTastyMenu6 from '../../../assets/images/tasty-menu-6.jpeg';
import ImgTastyMenu7 from '../../../assets/images/tasty-menu-7.jpeg';
import ImgCustomer1 from '../../../assets/images/customer-1.jpeg';
import ImgCustomer2 from '../../../assets/images/customer-2.jpeg';
import ImgTeam from '../../../assets/images/team.jpeg';
import ImgSubscribe from '../../../assets/images/Artboard – 1.png';
import ImgPartner1 from '../../../assets/images/Demo logo.png';
import ImgPartner2 from '../../../assets/images/Film action.png';
import ImgPartner3 from '../../../assets/images/Lorem logo.png';
import ImgPartner4 from '../../../assets/images/Photo club.png';
import ImgPartner5 from '../../../assets/images/Playstation.png';
import ImgTeam1 from '../../../assets/images/team-1.jpeg';
import ImgTeam2 from '../../../assets/images/team-2.jpeg';

const Wrapper = ({ children, className, style }) => <div className={`py-5 ${className}`} style={style}>
    <div className="py-5">
        <div className="container">
            {children}
        </div>
    </div>
</div>;

const Customer = ({ children, img, name, title }) => <div className="p-4 text-white">
    <div className="d-flex align-items-center mb-5">
        <div className="mr-4">
            <div className="embed-responsive embed-responsive-1by1 rounded-circle position-relative" style={{ width: 110 }}>
                <div className="position-absolute w-100 h-100" style={{ background: `url('${img}') no-repeat center`, backgroundSize: "cover", top: 0, left: 0 }} />
            </div>
        </div>

        <div>
            <div className="text-large">{name}</div>
            <div className="text-green">{title}</div>
        </div>
    </div>

    <div>{children}</div>
</div>;

const Partner = ({ img }) => <div className="py-3 h-100 d-flex justify-content-center align-items-center">
    <img src={img} className="img-fluid" />
</div>;

class Home extends Component {
    render() {
        return <div className="Home">
            <div className="full-height-app position-relative">
                <div className="position-absolute w-100 h-100">
                    <div className="position-absolute w-100 h-100 bg-black-50 d-flex justify-content-center align-items-center">
                        <div id="banner" className="text-center text-white">
                            <div className="h1 mb-4">
                                SWEET BARBECUE ARE BAKED IN HEAVEN
                            </div>

                            <div className="row justify-content-center mb-4 text-large">
                                <div className="col-xl-8 col-lg-9 col-md-10 col-sm-11">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                    doloremque laudatium, totam rem aperiam, eaque ipsa
                                </div>
                            </div>

                            <div>
                                <Link className="text-400 text-large rounded-2 btn btn-xl px-4 py-2 btn-green text-decoration-none mr-xl-3 mr-0" to="/contact">Contact us</Link>
                                <Link className="text-400 text-large rounded-2 btn btn-xl px-4 py-2 btn-white text-decoration-none" to="/purchase">Order now</Link>
                            </div>
                        </div>
                    </div>

                    <HomeCarousel>
                        <div className="bg-transparent d-none d-xl-inline circle-carousel-indicator rounded-circle border border-3 border-green position-absolute" />
                    </HomeCarousel>
                </div>
            </div>

            <Wrapper className="bg-white text-dark">
                <div className="text-center mb-5">
                    <div className="h3">
                        Sweet Barbecue <span className="text-green">from BBQ237</span>
                    </div>

                    <div>Explore the tasty collections of Miodis Cakes</div>
                </div>

                <div className="row mb-5">
                    <Meal title="Demo Meal" img={ImgDemoMeal}>Sed ut perspiciatis unde omnis iste natus</Meal>
                    <Meal title="Greater Occasion" img={ImgGreaterOccasion}>Sed ut perspiciatis unde omnis iste natus</Meal>
                    <Meal title="Traditional Meal" img={ImgTraditionalMeal}>Sed ut perspiciatis unde omnis iste natus</Meal>
                    <Meal title="Valentine Meal" img={ImgValentineMeal}>Sed ut perspiciatis unde omnis iste natus</Meal>
                    <Meal title="Special Occasion" img={ImgSpecialOccasion}>Sed ut perspiciatis unde omnis iste natus</Meal>
                    <Meal title="Corporate Meal" img={ImgCorporateMeal}>Sed ut perspiciatis unde omnis iste natus</Meal>
                </div>

                <div className="text-center">
                    <Link to="/" className="text-400 text-large rounded-2 btn btn-lg btn-green text-decoration-none">View more</Link>
                </div>
            </Wrapper>

            <Wrapper className="text-white" style={{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${ImgBottles}') no-repeat center`, backgroundSize: "cover" }}>
                <div className="text-center mb-5">
                    <div className="h3">
                        About <span className="text-green">BBQ237</span>
                    </div>

                    <div>Explore the tasty collections of Miodis Cakes</div>
                </div>

                <div className="row">
                    <div className="col-lg-6 p-5 text-white bg-dark">
                        <div className="h3 mb-4">Sweet Barbecue</div>

                        <div className="mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A ad quasi non modi ipsam, consectetur praesentium dolore corrupti quisquam animi! Pariatur natus laboriosam aliquid animi corporis necessitatibus nihil incidunt a.
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A ad quasi non modi ipsam, consectetur praesentium dolore corrupti quisquam animi! Pariatur natus laboriosam aliquid animi corporis necessitatibus nihil incidunt a.
                        </div>

                        <div>
                            <Link className="text-400 text-large rounded-2 btn btn-green text-decoration-none" to="/purchase">Order now</Link>
                        </div>
                    </div>

                    <div className="col-lg-6 p-0">
                        <div className="embed-responsive embed-responsive-1by1 position-relative">
                            <div className="position-absolute w-100 h-100" style={{ background: `url('${ImgChicken}') no-repeat center`, backgroundSize: "cover", top: 0, left: 0 }}></div>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <Wrapper className="bg-white text-dark">
                <div className="text-center mb-5">
                    <div className="h3">
                        Tasty Menu <span className="text-green">from BBQ237</span>
                    </div>

                    <div>Explore the tasty collections of Miodis Cakes</div>
                </div>

                <div className="row justify-content-center">
                    <Menu title="Sweet Barbecue" price={10} img={ImgTastyMenu1} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgTastyMenu2} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgTastyMenu3} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgGreaterOccasion} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgDemoMeal} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgTastyMenu6} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgTastyMenu7} />
                    <Menu title="Sweet Barbecue" price={10} img={ImgChicken} />
                </div>
            </Wrapper>

            <Wrapper style={{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${ImgTastyMenu3}') no-repeat center`, backgroundSize: "cover" }}>
                <OwlCarousel ref="Customers" options={{ responsive: { 0: { items: 1 }, 1100: { items: 2 } }, loop: true, dots: false, nav: true, autoplay: true }}>
                    <Customer img={ImgCustomer1} name="ELINA DOE" title="Happy Customer">
                        " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudatium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi archi tecto beatae vitae dicta sunt explicabo. "
                    </Customer>

                    <Customer img={ImgCustomer2} name="JOHN DOE" title="Happy Customer">
                        " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudatium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi archi tecto beatae vitae dicta sunt explicabo. "
                    </Customer>
                </OwlCarousel>
            </Wrapper>

            <Wrapper className="bg-white text-dark">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="bg-green-20 p-5 rounded-lg">
                                    <div className="h3 mb-4">SUBSCRIBE TO OUR BBQ237</div>

                                    <div className="text-secondary mb-4">
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium do loremque.
                                    </div>

                                    <Form />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <img src={ImgSubscribe} className="img-fluid" />
                    </div>
                </div>
            </Wrapper>

            <Wrapper style={{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${ImgTeam}') no-repeat center`, backgroundSize: "cover" }}>
                <OwlCarousel ref="Partners" options={{ responsive: { 0: { items: 1 }, 1100: { items: 5 }, 1550: { items: 6 } }, loop: true, dots: false, nav: false, autoplay: true }}>
                    <Partner img={ImgPartner1} />
                    <Partner img={ImgPartner2} />
                    <Partner img={ImgPartner3} />
                    <Partner img={ImgPartner4} />
                    <Partner img={ImgPartner5} />
                </OwlCarousel>
            </Wrapper>

            <Wrapper className="bg-white text-dark">
                <div className="text-center mb-5">
                    <div className="h3">
                        Our team <span className="text-green">BBQ237</span>
                    </div>

                    <div>Explore the tasty collections of Miodis Cakes</div>
                </div>

                <div className="row">
                    <TeamMemberCard name="First One" title="Managing Director" src={ImgTeam1} />
                    <TeamMemberCard name="Second One" title="Senior Accountant" src={ImgCustomer1} />
                    <TeamMemberCard name="Third One" title="Graphic Designer" src={ImgTeam2} />
                    <TeamMemberCard name="Last One" title="Team member" src={ImgCustomer2} />
                </div>
            </Wrapper>
        </div>;
    }
}

export default withRouter(Home);