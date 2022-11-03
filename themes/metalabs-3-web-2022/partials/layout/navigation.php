<?php

use metalabs3Web2022\helpers\AttributeHelper;
use metalabs3Web2022\menus\Menus;

$menus            = new Menus();
$attribute_helper = new AttributeHelper();
$menu_items       = $menus->get_nav_menu_items_by_location( $menus::HEADER_MENU_LOCATION );
?>
    <!-- NAVIGATION -->
    <nav class="c-navigation-wrapper js-navigation-wrapper">
        <nav class="c-navigation js-navigation">
            <a class="c-navigation__logo js-nav-logo" data-scroll-to="#home">
				<?= get_icon( 'logo' ); ?>
            </a>

			<?php if ( ! empty( $menu_items ) ) { ?>
                <ul class="c-navigation__list u-b3 js-navigation-list u-uppercase">
					<?php foreach ( $menu_items as $menu_item ) {
						$data_attributes = $attribute_helper->format_data_attributes( array(
							array(
								'name'    => 'target',
								'value'   => $menu_item->target,
								'is_data' => false,
							),
							array(
								'name'    => 'scroll-to',
								'value'   => str_contains( $menu_item->url, '#' ) ? $menu_item->url : '',
								'is_data' => true,
							),
						) );

						$url = str_contains( $menu_item->url, '#' ) ? trailingslashit( get_home_url() ) . $menu_item->url : $menu_item->url;
						?>
                        <li class="c-navigation__item">
                            <a href="<?= esc_url( $url ); ?>"
                               class="c-navigation__link" <?= esc_attr( $data_attributes ); ?>>
								<?= esc_html( $menu_item->title ); ?>
                            </a>
                        </li>
					<?php } ?>
                </ul>
			<?php } ?>
            <button class="c-hamburger js-hamburger">
                <i></i>
            </button>
        </nav>
    </nav>
    <!-- //NAVIGATION -->

<?php
get_partial( 'layout/mobile-navigation' );

