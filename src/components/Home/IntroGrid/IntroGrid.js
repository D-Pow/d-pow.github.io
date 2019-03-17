import React from 'react';
import Grid from 'components/ui/Grid';

class IntroGrid extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column areaName={'col-1'}>
                        1-1
                    </Grid.Column>
                    <Grid.Column areaName={'col-2'}>
                        1-2
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column areaName={'col-3'}>
                        2-1
                    </Grid.Column>
                    <Grid.Column areaName={'col-4'}>
                        2-2
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default IntroGrid;
