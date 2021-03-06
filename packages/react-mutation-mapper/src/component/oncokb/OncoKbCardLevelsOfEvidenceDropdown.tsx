import React from 'react';

import levelStyles from './level.module.scss';
import mainStyles from './main.module.scss';
import collapsibleStyles from './collapsible.module.scss';
import { Collapse } from 'react-collapse';
import { levelIconClassNames } from '../../util/OncoKbUtils';
import classnames from 'classnames';
import { observable, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';

export type LevelsOfEvidenceDropdownProps = {
    levels: string[];
    levelDes: { [level: string]: JSX.Element };
};

@observer
export default class OncoKbCardLevelsOfEvidenceDropdown extends React.Component<
    LevelsOfEvidenceDropdownProps
> {
    constructor(props: any) {
        super(props);
        makeObservable(this);
    }
    @observable levelsCollapsed: boolean = true;

    public levelListItem(level: string, levelDes: JSX.Element) {
        return (
            <li key={level} className={levelStyles['levels-li']}>
                <i className={levelIconClassNames(level)} />
                {levelDes}
            </li>
        );
    }

    public generateLevelRows(): JSX.Element[] {
        const rows: JSX.Element[] = [];
        this.props.levels.forEach(level => {
            rows.push(this.levelListItem(level, this.props.levelDes[level]));
        });

        return rows;
    }

    @action.bound
    handleLevelCollapse(): void {
        this.levelsCollapsed = !this.levelsCollapsed;
    }

    render() {
        return (
            <div>
                <div
                    data-test="oncokb-card-levels-of-evidence-dropdown-header"
                    className={collapsibleStyles['collapsible-header']}
                    onClick={this.handleLevelCollapse}
                >
                    Levels of Evidence
                    <span style={{ float: 'right' }}>
                        {this.levelsCollapsed ? (
                            <i
                                className={classnames(
                                    'fa fa-chevron-down',
                                    mainStyles['blue-icon']
                                )}
                            />
                        ) : (
                            <i
                                className={classnames(
                                    'fa fa-chevron-up',
                                    mainStyles['blue-icon']
                                )}
                            />
                        )}
                    </span>
                </div>
                <Collapse isOpened={!this.levelsCollapsed}>
                    <div
                        className={classnames(
                            levelStyles.levels,
                            collapsibleStyles['levels-collapse']
                        )}
                    >
                        <ul
                            style={{
                                lineHeight: 8,
                                padding: 0,
                            }}
                        >
                            {this.generateLevelRows()}
                        </ul>
                    </div>
                </Collapse>
            </div>
        );
    }
}
