/**
 * External dependencies
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

/**
 * Internal dependencies
 */
import store from 'state/redux-store';
import i18n from 'i18n-calypso';
import Main from 'main';

Initial_State.locale = JSON.parse( Initial_State.locale );

if ( 'undefined' !== typeof Initial_State.locale[ '' ] ) {
	Initial_State.locale[ '' ].localeSlug = Initial_State.localeSlug;

	// Overloading the toLocaleString method to use the set locale
	Number.prototype.realToLocaleString = Number.prototype.toLocaleString;

	Number.prototype.toLocaleString = function( locale, options ) {
		locale = locale || Initial_State.localeSlug;
		options = options || {};

		return this.realToLocaleString( locale, options );
	};
} else {
	Initial_State.locale = { '': { localeSlug: Initial_State.localeSlug } };
}

i18n.setLocale( Initial_State.locale );

const history = syncHistoryWithStore( hashHistory, store );

render();

function render() {
	const container = document.getElementById( 'jp-plugin-container' );

	if ( container === null ) {
		return;
	}

	ReactDOM.render(
		<div>
			<Provider store={ store }>
				<Router history={ history }>
					<Route path='/' component={ Main } />
					<Route path='/dashboard' component={ Main } />
					<Route path='/apps' component={ Main } />
					<Route path='/professional' component={ Main } />
					<Route path='/settings' component={ Main } />
					<Route path='/general' component={ Main } />
					<Route path='/engagement' component={ Main } />
					<Route path='/security' component={ Main } />
					<Route path='/appearance' component={ Main } />
					<Route path='/writing' component={ Main } />
				</Router>
			</Provider>
		</div>,
		container
	);
}

// For adding a class on page load.
let hash = window.location.hash;
hash = hash.split( '?' )[0];
if ( '#/' === hash || '#/dashboard' === hash ) {
	let subNavItem = jQuery( '#toplevel_page_jetpack' ).find( 'li' ).filter( function( index ) {
		return index === 1;
	} );
	subNavItem[0].classList.add( 'current' );
} else if ( '#/settings' === hash ) {
	let subNavItem = jQuery( '#toplevel_page_jetpack' ).find( 'li' ).filter( function( index ) {
		return index === 2;
	} );
	subNavItem[0].classList.add( 'current' );
}

// For adding the class on menu click.  
jQuery( 'body' ).on( 'click', '#toplevel_page_jetpack, #toplevel_page_jetpack li', function ( event ) {
	var $this = jQuery( this );

	event.stopPropagation();

	if ( $this.hasClass( 'wp-has-submenu' ) ) {
		$this = jQuery( '.wp-submenu .wp-first-item', '#toplevel_page_jetpack' );
	}

	$this.siblings().removeClass( 'current' );
	$this.addClass( 'current' );
} );
