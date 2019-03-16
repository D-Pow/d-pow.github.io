import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'components/ui/Grid';

class IntroGrid extends React.Component {
    render() {
        return (
            <Grid areasFormat={[
                ['col-1', 'col-2'],
                ['col-1', 'col-2']
            ]}>
                <Grid.Row>
                    <Grid.Column areaName={'col-1'}>
                        1-1
                    </Grid.Column>
                    <Grid.Column areaName={'col-2'}>
                        1-2
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column areaName={'col-1'}>
                        2-1
                    </Grid.Column>
                    <Grid.Column areaName={'col-2'}>
                        2-2
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

IntroGrid.propTypes = {

};

export default IntroGrid;
