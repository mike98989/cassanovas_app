<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="{{ asset('images/logo_white.png')}}">
    <!-- <link href="{{ asset('images/logo/logo.png')}}" rel="icon"> -->
    
    <title>{{env('APP_NAME')}}</title>
    <!-- Styles -->
<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap-slider.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/fontawesome-all.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/slick.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">

</head>
<body>
<div id="header-holder" class="main-header">
    <div class="bg-animation">
        <div class="graphic-show">
            <img class="fix-size" src="{{ asset('images/graphic1.png') }}" alt="">
            <img class="img img1" src="{{ asset('images/pack_SALT&PEPPER_60g_png.png') }}" alt="">
            <img class="img img2" src="{{ asset('images/pack_FUNKY_60g_png.png') }}" alt="">
            <img class="img img3" src="{{ asset('images/pack_HOT&SPICY_60g_png.png') }}" alt="">
            <!-- <img class="img img4" src="{{ asset('images/pack_BBQ_60g_png.png') }}" alt=""> -->
        </div>
    </div>
    <nav id="nav" class="navbar navbar-default navbar-full">
        <div class="container-fluid">
            <div class="container container-nav">
                <div class="row">
                    <div class="col-md-12">
                        <div class="navbar-header">
                            <button aria-expanded="false" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="logo-holder" href="#">
                                <div class="logo" style="width:102px;height:138px"></div>
                            </a>
                        </div>
                        <div style="height: 1px;" role="main" aria-expanded="false" class="navbar-collapse collapse" id="bs">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="./index">Home</a></li>
                                <li><a href="./contact">Contact us</a></li>
                                <li><a class="login-button" href="./signin">Login</a></li>
                                <li class="support-button-holder support-dropdown">
                                    <a class="support-button" href="#">Support</a>
                                    <ul class="dropdown-menu">
                                      <li><a target="_blank" href="https://wa.me/08138004276"><i class="fas fa-comments"></i>Whatsapp - 08138004276</a></li>
                                      <li><a href="#"><i class="fas fa-envelope"></i>Email support@cassanovas.ng</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div id="top-content" class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-7">
                    <div id="main-slider">
                        <div class="slide">
                            
                           
                            <div class="big-title">Ordering for your <span>Chips,</span><br><span>Just Got Better.</span></div>
                            <p>Cassanovas are Nigeria’s frst cassava snack food brand and producers of the best, most consistent and tastiest quality branded snacks in West Africa. We provide an end-to-end sales and ordering service with no middle-man to keep our prices competitive. We also support sales through an active marketing scheme that will boost sales across the country.</p>
                            <div class="btn-holder">
                                <a href="./signup" class="ybtn ybtn-header-color">Register</a><a href="./contact" class="ybtn ybtn-white ybtn-shadow">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <img class="header-graphic" src="http://brandio.io/envato/hostify/html/images/graphic1.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>


<div id="pricing" class="container-fluid">
    <div class="bg-color"></div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row-title">Fantastic Flavours</div>
                <div class="row-subtitle">Everyone's Favourite</div>
            </div>
        </div>
        <div class="row">
        @foreach($flavours as $flavour)
            <div class="col-sm-6 col-md-3">
                <div class="pricing-box pricing-unity pricing-color1">
                    <div class="pricing-content">
                    <img style="width:100%" src="{{URL::to('storage/flavour').'/'.$flavour->image}}" alt="{{$flavour->flavour}}"/>
                        <div class="pricing-title">{{$flavour->flavour}}</div>
                        <div class="pricing-price">N{{$flavour-> carton_price }}</div>
                        <div class="price-title">Per Pack</div>
                        <div class="pricing-details">
                            <p>{{$flavour->  description  }}</p>
                        </div>
                        <div class="pricing-link">
                            <a class="ybtn" href="{{ asset('/dashboard/order/new')}}">Order Now</a>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
            
        </div>
    </div>
</div>

<div id="features" class="container-fluid">
    <div class="container">
        
        <div class="row rtl-cols">
            <div class="col-sm-12 col-md-6">
                <div id="features-links-holder">
                    <div class="icons-axis">
                        <img src="{{ asset('images/Packs_and_Cartons2_png.png') }}" alt="">
                    </div>
                    <div class="feature-icon-holder feature-icon-holder1 opened" data-id="1">
                        
                        <div class="feature-icon"><img src="{{ asset('images/chips_icon.png') }}" alt="" style="width:50px"></div>
                        <div class="feature-title">Flavoured Cassava Chips</div>
                    </div>
                    <div class="feature-icon-holder feature-icon-holder2" data-id="2">
                        <div class="feature-icon"><img src="{{ asset('images/africa_icon2.png') }}" alt="" style="width:50px"></div>
                        <div class="feature-title">First premium cassava chips in Africa</div>
                    </div>
                    <div class="feature-icon-holder feature-icon-holder3" data-id="3">
                       
                        <div class="feature-icon"><img src="{{ asset('images/shield_icon.png') }}" alt="" style="width:50px"></div>
                        <div class="feature-title">Peeled, Sliced, Fried and Flavoured</div>
                    </div>
                    <div class="feature-icon-holder feature-icon-holder4" data-id="4">
                        
                        <div class="feature-icon"><img src="{{ asset('images/approved_icon.png') }}" alt="" style="width:50px"></div>
                        <div class="feature-title">NAFDAC Certified</div>
                    </div>
                    <div class="feature-icon-holder feature-icon-holder5" data-id="5">
                       
                        <div class="feature-icon"><img src="{{ asset('images/nigeria_icon.png') }}" alt="" style="width:50px"></div>
                        <div class="feature-title">100% Nigerian</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div id="features-holder">
                    <div class="feature-box feature-d1 show-details">
                        <div class="feature-title-holder">
                            <span class="feature-icon"><i class="htfy htfy-worldwide"></i></span>
                            <span class="feature-title">How We Ensure Quality</span>
                        </div>
                        <div class="feature-details">
                            <p>All of our ingredients are sourced from farms and certified suppliers in Nigeria. We regularly inspect our suppliers for quality, hygiene, safety and standards.</p>

                            <p>We process all of our cassava within hours of harvesting, and we conduct taste tests and laboratory analysis of our products at least 6 times a day.</p>
                        </div>
                    </div>
                    <div class="feature-box feature-d2">
                        <div class="feature-title-holder">
                            <span class="feature-icon"><i class="htfy htfy-cogwheel"></i></span>
                            <span class="feature-title">Easy control panel</span>
                        </div>
                        <div class="feature-details">
                            <p>At vero eos et accusamus et iusto odio dignissimos
                                ducimus qui blanditiis praesentium voluptatum div
                                atque corrupti quos dolores et quas molestias.</p>

                            <p>dignissimos ducimus qui blanditiis praesentium
                                voluptatum div atque corrupti quos dolores et quas
                                unimo molestias.</p>
                        </div>
                    </div>
                    <div class="feature-box feature-d3">
                        <div class="feature-title-holder">
                            <span class="feature-icon"><i class="htfy htfy-location"></i></span>
                            <span class="feature-title">Email Marketing</span>
                        </div>
                        <div class="feature-details">
                            <p>At vero eos et accusamus et iusto odio dignissimos
                                ducimus qui blanditiis praesentium voluptatum div
                                atque corrupti quos dolores et quas molestias.</p>

                            <p>dignissimos ducimus qui blanditiis praesentium
                                voluptatum div atque corrupti quos dolores et quas
                                unimo molestias.</p>
                        </div>
                    </div>
                    <div class="feature-box feature-d4">
                        <div class="feature-title-holder">
                            <span class="feature-icon"><i class="htfy htfy-download"></i></span>
                            <span class="feature-title">1CLICK Script Installs</span>
                        </div>
                        <div class="feature-details">
                            <p>At vero eos et accusamus et iusto odio dignissimos
                                ducimus qui blanditiis praesentium voluptatum div
                                atque corrupti quos dolores et quas molestias.</p>

                            <p>dignissimos ducimus qui blanditiis praesentium
                                voluptatum div atque corrupti quos dolores et quas
                                unimo molestias.</p>
                        </div>
                    </div>
                    <div class="feature-box feature-d5">
                        <div class="feature-title-holder">
                            <span class="feature-icon"><i class="htfy htfy-like"></i></span>
                            <span class="feature-title">7/24 Support</span>
                        </div>
                        <div class="feature-details">
                            <p>At vero eos et accusamus et iusto odio dignissimos
                                ducimus qui blanditiis praesentium voluptatum div
                                atque corrupti quos dolores et quas molestias.</p>

                            <p>dignissimos ducimus qui blanditiis praesentium
                                voluptatum div atque corrupti quos dolores et quas
                                unimo molestias.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div id="footer" class="container-fluid">
    <div class="container">
        <div class="row">
            <div class="col-xs-6 col-sm-4 col-md-3">
                <div class="address-holder">
                    <div class="phone"><i class="fas fa-phone"></i> 0813 800 4276</div>
                    <div class="email"><i class="fas fa-envelope"></i> <a href="mailto:support@cassanovas.ng">support@cassanovas.ng</a></div>
                    <div class="address">
                        <i class="fas fa-map-marker"></i> 
                        <div>Block B3 Ivy Apartments,<br>
                                    Wuye,<br />
                                    Abuja, Federal Capital Territory,
                                    Nigeria.</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
<script src="{{ asset('js/hostify/jquery.min.js') }}"></script>
<script src="{{ asset('js/hostify/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/hostify/bootstrap-slider.min.js') }}"></script>
<script src="{{ asset('js/hostify/slick.js') }}"></script>
<script src="{{ asset('js/hostify/main.js') }}"></script>
</body>
</html>