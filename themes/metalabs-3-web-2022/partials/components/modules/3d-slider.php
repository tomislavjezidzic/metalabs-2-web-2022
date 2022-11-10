<?php
/**
 *
 * @var array $slides (title primary, title secondary, model)
 * @var string $anchor_id
 **
 */


if ( ! empty( $slides ) ) {
	$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
	?>
    <section class="o-section c-3d-slider js-3d-slider-wrapper" <?= esc_attr( $anchor ); ?> data-anchor-target="<?= $anchor_id; ?>">
        <div class="c-3d-slider__slider u-a4 u-uppercase">
            <div class="swiper js-3d-slider">
                <div class="swiper-wrapper">
					<?php foreach ( $slides as $slide ) {
						if ( ! empty( $slide['model'] ) && ! empty( $slide['title_primary'] ) && ! empty( $slide['title_secondary'] ) ) { ?>
                            <div class="swiper-slide c-3d-slider__slide js-3d-slider-slide"
                                 data-model="<?= esc_url( $slide['model']['url'] ); ?>">
                                <div class="c-3d-slider__slide-title">
                                    <h3 class="u-fw-500 js-slide-title-primary">
										<?= esc_html( $slide['title_primary'] ); ?>
                                    </h3>
                                    <h3 class="u-serif u-fw-300 js-slide-title-secondary">
										<?= esc_html( $slide['title_secondary'] ); ?>
                                    </h3>
                                </div>
                            </div>
						<?php }
					} ?>
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
				<?= get_icon( 'arrow-left' ); ?>
            </div>
            <div class="swiper-button-next js-3d-slider-next has-hover">
				<?= get_icon( 'arrow-right' ); ?>
            </div>
        </div>
    </section>
<?php } ?>
