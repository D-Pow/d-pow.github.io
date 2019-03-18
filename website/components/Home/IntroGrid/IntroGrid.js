import React from 'react';
import Grid from 'components/ui/Grid';

class IntroGrid extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        1-1
                    </Grid.Column>
                    <Grid.Column>
                        1-2
                    </Grid.Column>
                    <Grid.Column>
                        1-3
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        2-1
                    </Grid.Column>
                    <Grid.Column>
                        2-2
                    </Grid.Column>
                    <Grid.Column>
                        2-3
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        3-1
                    </Grid.Column>
                    <Grid.Column>
                        3-2
                    </Grid.Column>
                    <Grid.Column>
                        3-3
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default IntroGrid;
