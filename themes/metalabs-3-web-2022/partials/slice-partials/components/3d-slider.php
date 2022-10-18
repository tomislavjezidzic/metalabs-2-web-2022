<section class="o-section c-3d-slider js-3d-slider-wrapper">
    <div class="c-3d-slider__slider u-a4 u-fw-500 u-uppercase">
        <div class="swiper js-3d-slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide c-3d-slider__slide js-3d-slider-slide"
                     data-model="<?= bu( "models/slider-model-1.glb" ) ?>">
                    <div class="c-3d-slider__slide-title">
                        <h3 class="js-slide-title-primary">
                            discover
                        </h3>
                        <h3 class="u-serif u-fw-300 js-slide-title-secondary">
                            discover
                        </h3>
                    </div>
                </div>

                <div class="swiper-slide c-3d-slider__slide js-3d-slider-slide"
                     data-model="<?= bu( "models/slider-model-2.glb" ) ?>">
                    <div class="c-3d-slider__slide-title">
                        <h3 class="js-slide-title-primary">
                            awake
                        </h3>
                        <h3 class="u-serif u-fw-300 js-slide-title-secondary">
                            awake
                        </h3>
                    </div>
                </div>

                <div class="swiper-slide c-3d-slider__slide js-3d-slider-slide"
                     data-model="<?= bu( "models/slider-model-3.glb" ) ?>">
                    <div class="c-3d-slider__slide-title">
                        <h3 class="js-slide-title-primary">
                            create
                        </h3>
                        <h3 class="u-serif u-fw-300 js-slide-title-secondary">
                            create
                        </h3>
                    </div>
                </div>

                <div class="swiper-slide c-3d-slider__slide js-3d-slider-slide"
                     data-model="<?= bu( "models/slider-model-4.glb" ) ?>">
                    <div class="c-3d-slider__slide-title">
                        <h3 class="js-slide-title-primary">
                            sustain
                        </h3>
                        <h3 class="u-serif u-fw-300 js-slide-title-secondary">
                            sustain
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-3d-slider__models js-3d-slider-models">

    </div>

    <div class="c-3d-slider__overlay">

    </div>

    <div class="c-3d-slider__navigation">
        <div class="swiper-pagination c-3d-slider__pagination js-3d-slider-pagination u-b1 u-serif u-fw-300"></div>

        <div class="swiper-button-prev js-3d-slider-prev has-hover">
			<?= get_icon( "arrow-left" ); ?>
        </div>
        <div class="swiper-button-next js-3d-slider-next has-hover">
			<?= get_icon( "arrow-right" ); ?>
        </div>
    </div>
</section>
