import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

import {
  Money as MoneyIcon
} from '@material-ui/icons';


// Shared components
import { Paper } from 'common/components';

// Component styles
import styles from './styles';

class Budget extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>            
            <Typography
              className={classes.title}
              variant="body2"
            >
              文档总数
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              0
            </Typography>  
          </div>
          <div className={classes.iconWrapper}>
            <MoneyIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.caption}
            variant="caption"
          >
              截至昨天已处理的文档
          </Typography>
        </div>
      </Paper>
    );
  }
}

Budget.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Budget);