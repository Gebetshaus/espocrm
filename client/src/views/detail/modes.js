/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM – Open Source CRM application.
 * Copyright (C) 2014-2024 Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko
 * Website: https://www.espocrm.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

import View from 'view';

class DetailModesView extends View {

    // language=Handlebars
    templateContent = `
        <div class="button-container clearfix">
            <div class="btn-group pull-right">
                {{#each modeDataList}}
                    <button
                        class="btn btn-text {{#if active}} active{{/if}}"
                        data-action="switchMode"
                        data-value="{{name}}"
                        {{#if ../disabled}}disabled="disabled"{{/if}}
                    >{{label}}</button>
                {{/each}}
            </div>
        </div>
    `

    /** @private */
    disabled = false

    /**
     * @param {{
     *     modeList: string[],
     *     mode: string,
     *     scope: string.
     * }} options
     */
    constructor(options) {
        super(options);

        /** @private */
        this.modeList = options.modeList;
        /** @private */
        this.mode = options.mode;
        /** @private */
        this.scope = options.scope;
    }

    data() {
        return {
            disabled: this.disabled,
            modeDataList: this.modeList.map(mode => {
                return {
                    name: mode,
                    active: mode === this.mode,
                    label: this.translate(mode, 'detailViewModes', this.scope),
                };
            })
        };
    }

    /**
     * Disable.
     *
     * @return {Promise}
     */
    disable() {
        this.disabled = true;

        return this.reRender();
    }

    /**
     * Enable.
     *
     * @return {Promise}
     */
    enable() {
        this.disabled = false

        return this.reRender();
    }
}

export default DetailModesView
